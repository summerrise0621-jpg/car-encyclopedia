'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import BrandCard from '@/components/BrandCard';
import SeriesCard from '@/components/SeriesCard';
import CategoryFilter from '@/components/CategoryFilter';
import type { Brand, Series, Region, BodyType, Powertrain } from '@/types';

interface HomeClientProps {
  brands: Brand[];
  allSeries: Series[];
}

const regionLabels: Record<Region, string> = {
  europe: '欧洲品牌',
  japan: '日本品牌',
  usa: '美国品牌',
  china: '中国品牌',
  korea: '韩国品牌',
  other: '其他品牌',
};

const regionOrder: Region[] = ['china', 'europe', 'japan', 'usa', 'korea', 'other'];

export default function HomeClient({ brands, allSeries }: HomeClientProps) {
  const [activeBody, setActiveBody] = useState<string | null>(null);
  const [activePowertrain, setActivePowertrain] = useState<string | null>(null);

  // 按地区分组品牌
  const brandsByRegion = useMemo(() => {
    return brands.reduce(
      (acc, brand) => {
        const region = brand.region || 'other';
        if (!acc[region]) acc[region] = [];
        acc[region].push(brand);
        return acc;
      },
      {} as Record<string, Brand[]>
    );
  }, [brands]);

  // 筛选车系
  const filteredSeries = useMemo(() => {
    return allSeries.filter((series) => {
      // 车型筛选
      if (activeBody && series.category !== activeBody) {
        return false;
      }

      // 动力类型筛选
      if (activePowertrain) {
        const hasMatchingPowertrain = series.generations.some((gen) =>
          gen.variants.some((v) => {
            if (activePowertrain === 'new') {
              return ['bev', 'phev', 'hybrid'].includes(v.powertrain);
            }
            return v.powertrain === activePowertrain;
          })
        );
        if (!hasMatchingPowertrain) return false;
      }

      return true;
    });
  }, [allSeries, activeBody, activePowertrain]);

  const handleFilterChange = (type: 'body' | 'powertrain', value: string | null) => {
    if (type === 'body') {
      setActiveBody(value);
    } else {
      setActivePowertrain(value);
    }
  };

  // 统计数据
  const stats = useMemo(() => {
    const bodyCounts: Record<string, number> = {};
    const powertrainCounts: Record<string, number> = { new: 0, bev: 0, phev: 0, hybrid: 0, petrol: 0 };

    allSeries.forEach((series) => {
      bodyCounts[series.category] = (bodyCounts[series.category] || 0) + 1;
      
      series.generations.forEach((gen) => {
        gen.variants.forEach((v) => {
          if (['bev', 'phev', 'hybrid'].includes(v.powertrain)) {
            powertrainCounts.new++;
          }
          powertrainCounts[v.powertrain] = (powertrainCounts[v.powertrain] || 0) + 1;
        });
      });
    });

    return { bodyCounts, powertrainCounts };
  }, [allSeries]);

  return (
    <main className="flex-1">
      {/* Hero 区域 */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              🚗 汽车百科
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              全面的汽车知识平台，涵盖全球各大品牌、车系和车型的详细参数与历史
            </p>
            <div className="flex justify-center">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-lg"
              >
                🔍 搜索汽车
              </Link>
            </div>
          </div>

          {/* 统计 */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">{brands.length}</div>
              <div className="text-sm text-blue-200">品牌</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{allSeries.length}</div>
              <div className="text-sm text-blue-200">车系</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                {stats.powertrainCounts.new > 0 ? `${Math.round(stats.powertrainCounts.new / allSeries.length * 100)}%` : '0%'}
              </div>
              <div className="text-sm text-blue-200">新能源占比</div>
            </div>
          </div>
        </div>
      </section>

      {/* 分类筛选区 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            📂 分类浏览
          </h2>
          <CategoryFilter
            onFilterChange={handleFilterChange}
            activeBody={activeBody}
            activePowertrain={activePowertrain}
          />
        </div>
      </section>

      {/* 车系列表 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {activeBody || activePowertrain ? '🔍 筛选结果' : '🔥 热门车型'}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredSeries.length} 个车系)
            </span>
          </h2>
          {(activeBody || activePowertrain) && (
            <button
              onClick={() => {
                setActiveBody(null);
                setActivePowertrain(null);
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              清除筛选
            </button>
          )}
        </div>

        {filteredSeries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSeries.map((series) => {
              const brand = brands.find((b) => b.id === series.brand_id);
              return (
                <SeriesCard
                  key={series.id}
                  series={series}
                  brandName={brand?.name_cn}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-4xl mb-4">🚗</p>
            <p>没有找到符合条件的车系</p>
            <button
              onClick={() => {
                setActiveBody(null);
                setActivePowertrain(null);
              }}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </section>

      {/* 品牌总览 - 按地区分组 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          🏭 品牌总览
        </h2>

        {regionOrder
          .filter((region) => brandsByRegion[region]?.length)
          .map((region) => (
            <div key={region} className="mb-10">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                {regionLabels[region]}
                <span className="text-sm font-normal text-gray-500">
                  ({brandsByRegion[region].length}个品牌)
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {brandsByRegion[region].map((brand) => (
                  <BrandCard key={brand.id} brand={brand} />
                ))}
              </div>
            </div>
          ))}
      </section>
    </main>
  );
}
