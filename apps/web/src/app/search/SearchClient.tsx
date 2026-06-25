"use client";

import { useState, useMemo } from 'react';
import type { Brand, Series } from '@/types';

interface SearchClientProps {
  brands: Brand[];
  series: Series[];
}

export default function SearchClient({ brands, series }: SearchClientProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();
    const items: Array<{ type: string; id: string; title: string; subtitle: string; href: string }> = [];

    // Search brands
    brands.forEach((brand) => {
      if (
        brand.name_cn.toLowerCase().includes(q) ||
        brand.name_en.toLowerCase().includes(q) ||
        brand.country.toLowerCase().includes(q)
      ) {
        items.push({
          type: '品牌',
          id: brand.id,
          title: brand.name_cn,
          subtitle: `${brand.name_en} · ${brand.country} · ${brand.founded_year}年`,
          href: `/brand/${brand.id}`,
        });
      }
    });

    // Search series
    series.forEach((s) => {
      const brand = brands.find((b) => b.id === s.brand_id);
      if (
        s.name_cn.toLowerCase().includes(q) ||
        s.name_en.toLowerCase().includes(q) ||
        s.brand_id.toLowerCase().includes(q)
      ) {
        items.push({
          type: '车系',
          id: s.id,
          title: s.name_cn,
          subtitle: `${s.name_en} · ${brand?.name_cn || s.brand_id}`,
          href: `/series/${s.id}`,
        });
      }

      // Search variants
      s.generations.forEach((gen) => {
        gen.variants.forEach((v) => {
          if (v.name.toLowerCase().includes(q)) {
            items.push({
              type: '车型',
              id: v.id,
              title: v.name,
              subtitle: `${s.name_cn} · ${gen.name} · ${v.year}`,
              href: `/series/${s.id}`,
            });
          }
        });
      });
    });

    return items;
  }, [query, brands, series]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">搜索</h1>

        <div className="relative mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索品牌、车系、车型名称..."
            className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            autoFocus
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl">🔍</span>
        </div>

        {query.trim() && (
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            找到 {results.length} 个结果
          </p>
        )}

        <div className="space-y-3">
          {results.map((item) => (
            <a
              key={`${item.type}-${item.id}`}
              href={item.href}
              className="block bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  item.type === '品牌' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  item.type === '车系' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                }`}>
                  {item.type}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {query.trim() && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              没有找到与 &quot;{query}&quot; 相关的结果
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
