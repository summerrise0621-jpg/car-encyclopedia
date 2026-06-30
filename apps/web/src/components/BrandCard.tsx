'use client';

import Link from 'next/link';
import type { Brand } from '@/types';

interface BrandCardProps {
  brand: Brand;
}

const regionColors: Record<string, string> = {
  europe: 'border-blue-200 dark:border-blue-800',
  japan: 'border-red-200 dark:border-red-800',
  usa: 'border-green-200 dark:border-green-800',
  china: 'border-yellow-200 dark:border-yellow-800',
  korea: 'border-purple-200 dark:border-purple-800',
  other: 'border-gray-200 dark:border-gray-800',
};

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brand/${brand.id}`}>
      <div
        className={`group bg-white dark:bg-gray-800 rounded-xl border-2 ${
          regionColors[brand.region] || regionColors.other
        } p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer`}
      >
        {/* Logo */}
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={brand.logo || `/logos/${brand.id}.svg`}
            alt={brand.name_cn}
            loading="lazy"
            decoding="async"
            className="w-14 h-14 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('bg-gradient-to-br', 'from-blue-500', 'to-indigo-600');
                parent.innerHTML = `<span class="text-2xl font-bold text-white">${brand.name_cn.charAt(0)}</span>`;
              }
            }}
          />
        </div>

        {/* Brand name */}
        <h3 className="text-center font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {brand.name_cn}
        </h3>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
          {brand.name_en}
        </p>

        {/* Country & Year */}
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span>{brand.country}</span>
          <span>·</span>
          <span>{brand.founded_year}年</span>
        </div>
      </div>
    </Link>
  );
}
