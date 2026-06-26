import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSeries, getSeries, getBrand } from '@/lib/data';
import SpecsTable from '@/components/SpecsTable';
import SeriesLogo from '@/components/SeriesLogo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  const allSeries = getAllSeries();
  return allSeries.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series = getSeries(id);
  if (!series) return { title: '车系未找到' };
  const brand = getBrand(series.brand_id);
  return {
    title: `${brand?.name_cn || ''} ${series.name_cn} - 汽车百科`,
    description: series.intro,
  };
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

const powertrainLabels: Record<string, string> = {
  petrol: '燃油',
  diesel: '柴油',
  hybrid: '混动',
  phev: '插混',
  bev: '纯电',
};

const drivetrainLabels: Record<string, string> = {
  fwd: '前驱',
  rwd: '后驱',
  awd: '四驱',
};

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const series = getSeries(id);
  if (!series) notFound();

  const brand = getBrand(series.brand_id);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Series Header */}
        <section className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* 面包屑 */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                首页
              </Link>
              <span>/</span>
              {brand && (
                <>
                  <Link
                    href={`/brand/${brand.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {brand.name_cn}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className="text-white">{series.name_cn}</span>
            </nav>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              <SeriesLogo
                src={series.image || `/series/${series.id}.jpg`}
                alt={series.name_cn}
                fallbackChar={series.name_cn.charAt(0)}
              />

              <div>
                <h1 className="text-3xl font-bold">
                  {brand?.name_cn} {series.name_cn}
                </h1>
                <p className="text-xl text-gray-300 mt-1">{series.name_en}</p>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className="text-sm px-3 py-1 bg-white/10 rounded-full">
                    {bodyTypeLabels[series.category] || series.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {series.generations.length} 代车型
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 车系简介 */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              车系简介
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {series.intro}
            </p>
          </section>

          {/* 各代车型 */}
          {series.generations.map((gen) => (
            <section key={gen.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {gen.name}
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {gen.year_start}
                  {gen.year_end ? `-${gen.year_end}` : '-至今'}
                </span>
                {gen.platform && (
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300">
                    平台: {gen.platform}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {gen.variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {variant.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>{variant.year}年</span>
                            {variant.engine && (
                              <>
                                <span>·</span>
                                <span>{variant.engine}</span>
                              </>
                            )}
                            {variant.transmission && (
                              <>
                                <span>·</span>
                                <span>{variant.transmission}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                            {bodyTypeLabels[variant.body_type] || variant.body_type}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                            {powertrainLabels[variant.powertrain] || variant.powertrain}
                          </span>
                          {variant.drivetrain && (
                            <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                              {drivetrainLabels[variant.drivetrain] || variant.drivetrain}
                            </span>
                          )}
                        </div>
                      </div>

                      {variant.price_range && (
                        <p className="mt-2 text-red-600 dark:text-red-400 font-semibold">
                          指导价: ¥ {variant.price_range}
                        </p>
                      )}
                    </div>

                    <div className="p-6">
                      <SpecsTable specs={variant.specs} title="详细参数" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* 返回链接 */}
          <div className="mt-8 flex items-center gap-4">
            {brand && (
              <Link
                href={`/brand/${brand.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← 返回 {brand.name_cn}
              </Link>
            )}
            <Link
              href="/"
              className="text-gray-500 dark:text-gray-400 hover:underline"
            >
              返回首页
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
