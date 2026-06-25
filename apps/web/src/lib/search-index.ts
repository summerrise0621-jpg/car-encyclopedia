import fs from 'fs';
import path from 'path';
import type { Brand, Series, SearchEntry } from '@/types';

const CONTENT_DIR = path.resolve(process.cwd(), '../../content');
const BRANDS_DIR = path.join(CONTENT_DIR, 'brands');
const MODELS_DIR = path.join(CONTENT_DIR, 'models');

function getAllBrands(): Brand[] {
  const files = fs.readdirSync(BRANDS_DIR).filter((f) => f.endsWith('.json'));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(BRANDS_DIR, file), 'utf-8');
    return JSON.parse(raw) as Brand;
  });
}

function getAllSeries(): Series[] {
  const files = fs.readdirSync(MODELS_DIR).filter((f) => f.endsWith('.json'));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(MODELS_DIR, file), 'utf-8');
    return JSON.parse(raw) as Series;
  });
}

// 构建搜索索引数据
export function buildSearchIndex(): SearchEntry[] {
  const brands = getAllBrands();
  const series = getAllSeries();
  const entries: SearchEntry[] = [];

  // 品牌条目
  for (const brand of brands) {
    entries.push({
      id: brand.id,
      type: 'brand',
      title: brand.name_cn,
      subtitle: brand.name_en,
      tags: [brand.country, brand.region, brand.name_en.toLowerCase()],
    });
  }

  // 车系条目
  for (const s of series) {
    const brand = brands.find((b) => b.id === s.brand_id);
    entries.push({
      id: s.id,
      type: 'series',
      title: s.name_cn,
      subtitle: `${brand?.name_cn || ''} ${s.name_en}`,
      brand_id: s.brand_id,
      tags: [s.name_en.toLowerCase(), s.category, brand?.name_cn || ''],
    });

    // 车型条目
    for (const gen of s.generations) {
      for (const v of gen.variants) {
        entries.push({
          id: v.id,
          type: 'variant',
          title: `${s.name_cn} ${v.name}`,
          subtitle: `${brand?.name_cn || ''} ${s.name_en} ${v.name} (${v.year})`,
          brand_id: s.brand_id,
          series_id: s.id,
          tags: [
            v.name.toLowerCase(),
            v.body_type,
            v.powertrain,
            v.year.toString(),
            s.name_en.toLowerCase(),
          ],
        });
      }
    }
  }

  return entries;
}
