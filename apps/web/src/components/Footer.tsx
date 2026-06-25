import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 关于 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              关于汽车百科
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              汽车百科是一个开放的汽车知识平台，致力于提供全面、准确、及时的汽车信息。
              涵盖全球各大汽车品牌、车系和车型的详细参数与历史。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              快速链接
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  搜索
                </Link>
              </li>
            </ul>
          </div>

          {/* 数据来源 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              数据来源
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              本平台数据来源于各品牌官方网站、权威汽车媒体和公开资料。
              如有错误或建议，欢迎反馈。
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} 汽车百科 · 数据仅供参考
          </p>
        </div>
      </div>
    </footer>
  );
}
