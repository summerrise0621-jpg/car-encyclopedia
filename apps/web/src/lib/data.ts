import fs from 'fs';
import path from 'path';
import type { Brand, Series, Variant } from '@/types';

const CONTENT_DIR = path.resolve(process.cwd(), '../../content');
const BRANDS_DIR = path.join(CONTENT_DIR, 'brands');
const MODELS_DIR = path.join(CONTENT_DIR, 'models');

// 获取所有品牌
export function getAllBrands(): Brand[] {
  const files = fs.readdirSync(BRANDS_DIR).filter((f) => f.endsWith('.json'));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(BRANDS_DIR, file), 'utf-8');
    return JSON.parse(raw) as Brand;
  });
}

// 获取单个品牌
export function getBrand(id: string): Brand | null {
  const filePath = path.join(BRANDS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Brand;
}

// 获取所有车系
export function getAllSeries(): Series[] {
  const files = fs.readdirSync(MODELS_DIR).filter((f) => f.endsWith('.json'));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(MODELS_DIR, file), 'utf-8');
    return JSON.parse(raw) as Series;
  });
}

// 获取单个车系
export function getSeries(id: string): Series | null {
  const filePath = path.join(MODELS_DIR, `${id}.json`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as Series;
}

// 根据品牌ID获取车系列表
export function getSeriesByBrand(brandId: string): Series[] {
  return getAllSeries().filter((s) => s.brand_id === brandId);
}

// 获取所有车型（扁平化）
export function getAllVariants(): (Variant & { series_id: string; series_name: string; brand_id: string })[] {
  const allSeries = getAllSeries();
  const variants: (Variant & { series_id: string; series_name: string; brand_id: string })[] = [];
  for (const s of allSeries) {
    for (const gen of s.generations) {
      for (const v of gen.variants) {
        variants.push({
          ...v,
          series_id: s.id,
          series_name: s.name_cn,
          brand_id: s.brand_id,
        });
      }
    }
  }
  return variants;
}
