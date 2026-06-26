'use client';

import Link from 'next/link';
import type { Series } from '@/types';

interface SeriesCardProps {
  series: Series;
  brandName?: string;
}

const bodyTypeLabels: Record<string, string> = {
  sedan: '轿车',
  suv: 'SUV',
  mpv: 'MPV',
  coupe: '跑车',
  convertible: '敞篷',
  hatchback: '两厢',
  wagon: '旅行车',
  pickup: '皮卡',
};

const powertrainColors: Record<string, string> = {
  petrol: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200',
  diesel: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200',
  hybrid: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200',
  phev: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-200',
  bev: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200',
};

export default function SeriesCard({ series, brandName }: SeriesCardProps) {
  // 收集所有动力类型
  const powertrains = new Set<string>();
  let latestYear = 0;
  let priceRange = '';

  for (const gen of series.generations) {
    for (const v of gen.variants) {
      powertrains.add(v.powertrain);
      if (v.year > latestYear) latestYear = v.year;
      if (v.price_range && !priceRange) priceRange = v.price_range;
    }
  }

  return (
    <Link href={`/series/${series.id}`}>
      <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 cursor-pointer">
        {/* Image */}
        <div className="relative h-40 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={series.image || `/series/${series.id}.jpg`}
            alt={series.name_cn}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // 尝试 SVG 备用
              if (target.src.endsWith('.jpg')) {
                target.src = `/series/${series.id}.svg`;
              } else {
                target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 250"><rect fill="%23f3f4f6" width="400" height="250"/><text x="200" y="125" text-anchor="middle" font-size="48">🚗</text></svg>`;
              }
            }}
          />
          {/* Category badge overlay */}
          <div className="absolute top-2 left-2">
            <span className="text-xs px-2 py-1 bg-black/60 text-white rounded-md backdrop-blur-sm">
              {bodyTypeLabels[series.category] || series.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Header */}
          <div className="mb-2">
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
              {series.name_cn}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
              {series.name_en}
            </p>
          </div>

          {/* Brand & Year */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
            {brandName && <span>{brandName}</span>}
            {latestYear > 0 && (
              <>
                <span>·</span>
                <span>最新 {latestYear}款</span>
              </>
            )}
          </div>

          {/* Powertrain badges */}
          <div className="flex flex-wrap gap-1.5">
            {Array.from(powertrains).map((pt) => (
              <span
                key={pt}
                className={`text-xs px-2 py-0.5 rounded ${powertrainColors[pt] || 'bg-gray-100 text-gray-700'}`}
              >
                {pt === 'petrol'
                  ? '燃油'
                  : pt === 'diesel'
                    ? '柴油'
                    : pt === 'hybrid'
                      ? '混动'
                      : pt === 'phev'
                        ? '插混'
                        : '纯电'}
              </span>
            ))}
          </div>

          {/* Price */}
          {priceRange && (
            <p className="mt-3 text-sm font-medium text-red-600 dark:text-red-400">
              ¥ {priceRange}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
