'use client';

import type { SearchEntry } from '@/types';

// 简单的客户端搜索实现（不依赖FlexSearch的SSR兼容性问题）
let searchEntries: SearchEntry[] = [];

// 从API加载搜索数据
export async function loadSearchData(): Promise<SearchEntry[]> {
  if (searchEntries.length > 0) return searchEntries;

  try {
    const res = await fetch('/api/search-index');
    if (res.ok) {
      searchEntries = await res.json();
    }
  } catch {
    // 如果API不可用，返回空数组
  }
  return searchEntries;
}

// 搜索函数：支持中英文模糊匹配
export function searchData(query: string, entries: SearchEntry[]): SearchEntry[] {
  if (!query.trim()) return [];

  const q = query.toLowerCase().trim();
  const tokens = q.split(/\s+/);

  return entries
    .map((entry) => {
      const searchText = [entry.title, entry.subtitle, ...entry.tags]
        .join(' ')
        .toLowerCase();

      let score = 0;
      for (const token of tokens) {
        if (searchText.includes(token)) {
          // 精确匹配标题得分更高
          if (entry.title.toLowerCase().includes(token)) {
            score += 10;
          } else if (entry.subtitle.toLowerCase().includes(token)) {
            score += 5;
          } else {
            score += 1;
          }
        }
      }
      return { ...entry, _score: score };
    })
    .filter((e) => e._score > 0)
    .sort((a, b) => b._score - a._score)
    .slice(0, 20);
}

// 获取类型标签
export function getTypeLabel(type: SearchEntry['type']): string {
  switch (type) {
    case 'brand':
      return '品牌';
    case 'series':
      return '车系';
    case 'variant':
      return '车型';
    default:
      return '未知';
  }
}

// 获取类型对应的颜色
export function getTypeColor(type: SearchEntry['type']): string {
  switch (type) {
    case 'brand':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'series':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'variant':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}
