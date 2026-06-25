#!/usr/bin/env python3
"""数据校验脚本 - 验证品牌和车型 JSON 数据的完整性和正确性"""

import json
import os
import sys
from pathlib import Path

CONTENT_DIR = Path(__file__).parent.parent.parent / "content"
BRANDS_DIR = CONTENT_DIR / "brands"
MODELS_DIR = CONTENT_DIR / "models"

REQUIRED_BRAND_FIELDS = ["id", "name_cn", "name_en", "country", "region", "founded_year", "logo", "intro"]
VALID_REGIONS = ["europe", "japan", "usa", "china", "korea", "other"]
VALID_BODY_TYPES = ["sedan", "suv", "mpv", "coupe", "convertible", "hatchback", "wagon", "pickup"]
VALID_POWERTRAINS = ["petrol", "diesel", "hybrid", "phev", "bev"]
VALID_DRIVETRAINS = ["fwd", "rwd", "awd"]

errors = []
warnings = []

def validate_brand(filepath):
    """校验品牌数据"""
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    brand_id = data.get("id", filepath.stem)
    
    # 必填字段
    for field in REQUIRED_BRAND_FIELDS:
        if field not in data:
            errors.append(f"[{brand_id}] 缺少必填字段: {field}")
    
    # 地区校验
    if data.get("region") not in VALID_REGIONS:
        errors.append(f"[{brand_id}] 无效的地区: {data.get('region')}，应为 {VALID_REGIONS}")
    
    # 成立年份合理性
    year = data.get("founded_year", 0)
    if year < 1800 or year > 2025:
        warnings.append(f"[{brand_id}] 成立年份可能有误: {year}")
    
    return brand_id

def validate_series(filepath):
    """校验车系数据"""
    with open(filepath, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    series_id = data.get("id", filepath.stem)
    
    # 必填字段
    for field in ["id", "brand_id", "name_cn", "name_en", "intro", "category", "generations"]:
        if field not in data:
            errors.append(f"[{series_id}] 缺少必填字段: {field}")
    
    # 车身类型校验
    if data.get("category") not in VALID_BODY_TYPES:
        errors.append(f"[{series_id}] 无效的车身类型: {data.get('category')}")
    
    # 代际校验
    for gen in data.get("generations", []):
        gen_id = gen.get("id", "unknown")
        if not gen.get("variants"):
            warnings.append(f"[{series_id}/{gen_id}] 没有具体车型数据")
        
        for variant in gen.get("variants", []):
            var_id = variant.get("id", "unknown")
            if variant.get("powertrain") not in VALID_POWERTRAINS:
                errors.append(f"[{series_id}/{gen_id}/{var_id}] 无效的动力类型: {variant.get('powertrain')}")
            if variant.get("drivetrain") and variant.get("drivetrain") not in VALID_DRIVETRAINS:
                errors.append(f"[{series_id}/{gen_id}/{var_id}] 无效的驱动方式: {variant.get('drivetrain')}")
    
    return series_id

def main():
    print("=" * 60)
    print("汽车百科数据校验")
    print("=" * 60)
    
    # 校验品牌
    brand_ids = set()
    print(f"\n校验品牌数据 ({BRANDS_DIR})...")
    if BRANDS_DIR.exists():
        for f in sorted(BRANDS_DIR.glob("*.json")):
            bid = validate_brand(f)
            brand_ids.add(bid)
            print(f"  ✓ {bid}")
    else:
        errors.append(f"品牌目录不存在: {BRANDS_DIR}")
    
    # 校验车系
    series_count = 0
    print(f"\n校验车系数据 ({MODELS_DIR})...")
    if MODELS_DIR.exists():
        for f in sorted(MODELS_DIR.glob("*.json")):
            sid = validate_series(f)
            series_count += 1
            
            # 检查 brand_id 引用
            with open(f, "r", encoding="utf-8") as fh:
                data = json.load(fh)
            if data.get("brand_id") not in brand_ids:
                warnings.append(f"[{sid}] brand_id \"{data.get('brand_id')}\" 在品牌数据中未找到")
            
            print(f"  ✓ {sid}")
    else:
        errors.append(f"车系目录不存在: {MODELS_DIR}")
    
    # 输出结果
    print(f"\n{'=' * 60}")
    print(f"校验完成: {len(brand_ids)} 个品牌, {series_count} 个车系")
    
    if warnings:
        print(f"\n⚠ 警告 ({len(warnings)}):")
        for w in warnings:
            print(f"  - {w}")
    
    if errors:
        print(f"\n✗ 错误 ({len(errors)}):")
        for e in errors:
            print(f"  - {e}")
        sys.exit(1)
    else:
        print("\n✓ 所有数据校验通过!")
        sys.exit(0)

if __name__ == "__main__":
    main()
