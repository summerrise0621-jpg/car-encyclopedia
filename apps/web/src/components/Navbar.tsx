'use client';

import Link from 'next/link';

interface NavbarProps {
  brandCount?: number;
}

export default function Navbar({ brandCount }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-950/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🚗</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              汽车百科
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              首页
            </Link>
            <Link
              href="/search"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
            >
              搜索
            </Link>
            <Link
              href="/kids"
              className="text-gray-700 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400 transition-colors"
            >
              🎮 儿童乐园
            </Link>
            {brandCount !== undefined && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {brandCount} 个品牌
              </span>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              href="/search"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
            >
              🔍
            </Link>
            <Link
              href="/kids"
              className="text-gray-700 hover:text-pink-600 dark:text-gray-300"
            >
              🎮
            </Link>
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300"
            >
              🏠
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
