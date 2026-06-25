'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { loadSearchData, searchData, getTypeLabel, getTypeColor } from '@/lib/search';
import type { SearchEntry } from '@/types';

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [entries, setEntries] = useState<SearchEntry[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSearchData().then(setEntries);
  }, []);

  useEffect(() => {
    if (query.trim().length > 0 && entries.length > 0) {
      const found = searchData(query, entries);
      setResults(found);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, entries]);

  // 点击外部关闭
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getLink = useCallback((entry: SearchEntry) => {
    switch (entry.type) {
      case 'brand':
        return `/brand/${entry.id}`;
      case 'series':
        return `/series/${entry.id}`;
      case 'variant':
        return entry.series_id ? `/series/${entry.series_id}` : '#';
      default:
        return '#';
    }
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && results.length > 0 && setIsOpen(true)}
          placeholder="搜索品牌、车系、车型..."
          className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* 下拉结果 */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto z-50">
          {results.map((entry) => (
            <Link
              key={`${entry.type}-${entry.id}`}
              href={getLink(entry)}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <span
                className={`text-xs px-2 py-0.5 rounded font-medium ${getTypeColor(entry.type)}`}
              >
                {getTypeLabel(entry.type)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {entry.title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {entry.subtitle}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 text-center text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            查看全部搜索结果 →
          </Link>
        </div>
      )}
    </div>
  );
}
