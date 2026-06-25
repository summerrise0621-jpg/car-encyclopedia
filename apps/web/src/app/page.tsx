import Link from 'next/link';
import { getAllBrands, getAllSeries } from '@/lib/data';
import BrandCard from '@/components/BrandCard';
import SeriesCard from '@/components/SeriesCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Brand, Region } from '@/types';

const regionLabels: Record<Region, string> = {
  europe: '欧洲品牌',
  japan: '日本品牌',
  usa: '美国品牌',
  china: '中国品牌',
  korea: '韩国品牌',
  other: '其他品牌',
};

const regionOrder: Region[] = ['china', 'europe', 'japan', 'usa', 'korea', 'other'];

export default function HomePage() {
  const brands = getAllBrands();
  const allSeries = getAllSeries();

  // 按地区分组
  const brandsByRegion = brands.reduce(
    (acc, brand) => {
      const region = brand.region || 'other';
      if (!acc[region]) acc[region] = [];
      acc[region].push(brand);
      return acc;
    },
    {} as Record<string, Brand[]>
  );

  // 热门车型（取前6个）
  const hotSeries = allSeries.slice(0, 6);

  return (
    <>
      <Navbar brandCount={brands.length} />

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
                  {allSeries.reduce(
                    (sum, s) =>
                      sum +
                      s.generations.reduce((gSum, g) => gSum + g.variants.length, 0),
                    0
                  )}
                </div>
                <div className="text-sm text-blue-200">车型</div>
              </div>
            </div>
          </div>
        </section>

        {/* 热门车型 */}
        {hotSeries.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                🔥 热门车型
              </h2>
              <Link
                href="/search"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                查看更多 →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotSeries.map((series) => {
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
          </section>
        )}

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

      <Footer />
    </>
  );
}
