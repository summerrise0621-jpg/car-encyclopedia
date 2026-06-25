import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllBrands, getBrand, getSeriesByBrand } from '@/lib/data';
import SeriesCard from '@/components/SeriesCard';
import Timeline from '@/components/Timeline';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  const brands = getAllBrands();
  return brands.map((brand) => ({ id: brand.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = getBrand(id);
  if (!brand) return { title: '品牌未找到' };
  return {
    title: `${brand.name_cn} (${brand.name_en}) - 汽车百科`,
    description: brand.intro,
  };
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const brand = getBrand(id);
  if (!brand) notFound();

  const seriesList = getSeriesByBrand(id);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Brand Header */}
        <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            {/* 面包屑 */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                首页
              </Link>
              <span>/</span>
              <span className="text-white">{brand.name_cn}</span>
            </nav>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Logo placeholder */}
              <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center text-5xl backdrop-blur-sm">
                {brand.name_cn.charAt(0)}
              </div>

              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold">
                  {brand.name_cn}
                </h1>
                <p className="text-xl text-gray-300 mt-1">{brand.name_en}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3 text-sm text-gray-400">
                  <span>🌍 {brand.country}</span>
                  <span>·</span>
                  <span>📅 创立于 {brand.founded_year} 年</span>
                  {brand.official_site && (
                    <>
                      <span>·</span>
                      <a
                        href={brand.official_site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        官网 ↗
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 品牌简介 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              品牌简介
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {brand.intro}
            </p>
          </section>

          {/* 品牌历史 */}
          {brand.history && brand.history.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                品牌历史
              </h2>
              <Timeline events={brand.history} />
            </section>
          )}

          {/* 车系列表 */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              车系列表
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({seriesList.length} 个车系)
              </span>
            </h2>

            {seriesList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {seriesList.map((series) => (
                  <SeriesCard
                    key={series.id}
                    series={series}
                    brandName={brand.name_cn}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 py-8 text-center">
                暂无车系数据
              </p>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
