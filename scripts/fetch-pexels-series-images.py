#!/usr/bin/env python3
"""Batch refresh car series images from Pexels API.

Uses curl (Pexels blocks Python urllib in Termux). Reads API key from ~/.pexels_key.
For each content/models/*.json file, searches Pexels once with per_page=3, downloads
up to 3 landscape images, and updates image/gallery to /series/<id>.jpg paths.
"""
from __future__ import annotations

import json
import os
import subprocess
import sys
import time
from pathlib import Path
from urllib.parse import quote_plus

ROOT = Path(__file__).resolve().parents[1]
MODELS_DIR = ROOT / "content" / "models"
SERIES_DIR = ROOT / "apps" / "web" / "public" / "series"
KEY_PATH = Path.home() / ".pexels_key"
REPORT_PATH = ROOT / "scripts" / "pexels-refresh-report.json"

MIN_IMAGE_BYTES = 10_000
REQUEST_PAUSE_EVERY = 10
REQUEST_PAUSE_SECONDS = 2
CURL_TIMEOUT = os.environ.get("CURL_TIMEOUT", "12")

CATEGORY_HINTS = {
    "sedan": "sedan",
    "suv": "SUV",
    "mpv": "minivan",
    "coupe": "coupe sports car",
    "convertible": "convertible car",
    "hatchback": "hatchback",
    "wagon": "wagon car",
    "pickup": "pickup truck",
}


def run(args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(args, capture_output=True, text=True)


def load_models() -> list[tuple[Path, dict]]:
    items = []
    for path in sorted(MODELS_DIR.glob("*.json")):
        with path.open("r", encoding="utf-8") as f:
            items.append((path, json.load(f)))
    return items


def search_pexels(api_key: str, query: str) -> dict | None:
    per_page = os.environ.get("PER_PAGE", "3")
    url = (
        "https://api.pexels.com/v1/search?"
        + "query=" + quote_plus(query)
        + "&per_page=" + per_page + "&orientation=landscape&locale=en-US"
    )
    auth_header = "Authorization" + ": " + api_key
    result = run([
        "curl", "-sS", "--max-time", os.environ.get("SEARCH_TIMEOUT", "10"),
        "-H", auth_header,
        url,
    ])
    if result.returncode != 0:
        return {"error": "curl failed", "stderr": result.stderr[-500:]}
    try:
        return json.loads(result.stdout)
    except Exception as exc:
        return {"error": f"json parse failed: {exc}", "stdout": result.stdout[:500]}


def download(url: str, target: Path) -> bool:
    tmp = target.with_suffix(target.suffix + ".tmp")
    tmp.unlink(missing_ok=True)
    result = subprocess.run([
        "curl", "-L", "-sS", "--max-time", CURL_TIMEOUT,
        "-o", str(tmp),
        url,
    ], capture_output=True, text=True)
    if result.returncode != 0:
        tmp.unlink(missing_ok=True)
        return False
    if not tmp.exists() or tmp.stat().st_size < MIN_IMAGE_BYTES:
        tmp.unlink(missing_ok=True)
        return False
    tmp.replace(target)
    return True


def best_photo_urls(photo: dict) -> list[str]:
    src = photo.get("src") or {}
    # landscape is a good card/header ratio; large/medium as fallback.
    return [u for u in [src.get("landscape"), src.get("large"), src.get("medium")] if u]


def build_query(model: dict) -> str:
    name = model.get("name_en") or model.get("name_cn") or model.get("id")
    category = CATEGORY_HINTS.get(model.get("category", ""), "car")
    # "official" and "wallpaper" tend to improve vehicle-specific results on Pexels.
    return f"{name} {category} car exterior"


def main() -> int:
    if not KEY_PATH.exists():
        print(f"ERROR missing API key file: {KEY_PATH}")
        return 2
    api_key = KEY_PATH.read_text(encoding="utf-8").strip()
    if not api_key:
        print(f"ERROR empty API key file: {KEY_PATH}")
        return 2

    SERIES_DIR.mkdir(parents=True, exist_ok=True)
    all_models = load_models()
    start_index = int(os.environ.get("START_INDEX", "1"))
    end_index = int(os.environ.get("END_INDEX", str(len(all_models))))
    selected = all_models[start_index - 1:end_index]
    models = selected
    report = {
        "start_index": start_index,
        "end_index": end_index,
        "total": len(models),
        "success": 0,
        "partial": 0,
        "failed": 0,
        "updated_json": 0,
        "items": [],
    }

    for idx, (path, model) in enumerate(models, start=1):
        sid = model.get("id") or path.stem
        query = build_query(model)
        data = search_pexels(api_key, query)
        item = {"id": sid, "query": query, "downloaded": 0, "files": [], "error": None}

        if not data or data.get("error"):
            item["error"] = data.get("error") if isinstance(data, dict) else "empty response"
            report["failed"] += 1
            report["items"].append(item)
            print(f"[{idx:03d}/{len(models)}] FAIL search {sid}: {item['error']}", flush=True)
        else:
            photos = data.get("photos") or []
            if not photos:
                item["error"] = "no photos"
                report["failed"] += 1
                report["items"].append(item)
                print(f"[{idx:03d}/{len(models)}] FAIL no photos {sid}", flush=True)
            else:
                downloaded_paths: list[str] = []
                for photo_i, photo in enumerate(photos[:3], start=1):
                    filename = f"{sid}.jpg" if photo_i == 1 else f"{sid}-{photo_i}.jpg"
                    target = SERIES_DIR / filename
                    ok = False
                    for url in best_photo_urls(photo):
                        if download(url, target):
                            ok = True
                            break
                    if ok:
                        web_path = f"/series/{filename}"
                        downloaded_paths.append(web_path)
                        item["files"].append(web_path)
                        item["downloaded"] += 1

                if downloaded_paths:
                    model["image"] = downloaded_paths[0]
                    model["gallery"] = downloaded_paths
                    with path.open("w", encoding="utf-8") as f:
                        json.dump(model, f, ensure_ascii=False, indent=2)
                        f.write("\n")
                    report["updated_json"] += 1
                    if len(downloaded_paths) >= 3:
                        report["success"] += 1
                        status = "OK"
                    else:
                        report["partial"] += 1
                        status = "PARTIAL"
                    print(f"[{idx:03d}/{len(models)}] {status} {sid}: {len(downloaded_paths)} images", flush=True)
                else:
                    item["error"] = "download failed"
                    report["failed"] += 1
                    print(f"[{idx:03d}/{len(models)}] FAIL download {sid}", flush=True)
                report["items"].append(item)

        if idx % REQUEST_PAUSE_EVERY == 0 and idx < len(models):
            time.sleep(REQUEST_PAUSE_SECONDS)

    REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("SUMMARY", json.dumps({k: report[k] for k in ["total", "success", "partial", "failed", "updated_json"]}, ensure_ascii=False), flush=True)
    print(f"REPORT {REPORT_PATH}", flush=True)
    return 0 if report["updated_json"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
