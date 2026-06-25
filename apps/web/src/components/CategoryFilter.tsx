'use client';

import { useState } from 'react';

export type FilterType = 'body' | 'powertrain';

interface FilterBarProps {
  onFilterChange: (type: FilterType, value: string | null) => void;
  activeBody: string | null;
  activePowertrain: string | null;
}

const bodyTypes = [
  { id: 'all', label: '全部', icon: '🚗' },
  { id: 'sedan', label: '轿车', icon: '🚘' },
  { id: 'suv', label: 'SUV', icon: '🚙' },
  { id: 'mpv', label: 'MPV', icon: '🚐' },
  { id: 'coupe', label: '跑车', icon: '🏎️' },
  { id: 'convertible', label: '敞篷', icon: '🏎️' },
  { id: 'hatchback', label: '两厢', icon: '🚘' },
  { id: 'wagon', label: '旅行车', icon: '🚘' },
  { id: 'pickup', label: '皮卡', icon: '🛻' },
];

const powertrainTypes = [
  { id: 'all', label: '全部动力', icon: '⚡' },
  { id: 'new', label: '新能源', icon: '🔋', types: ['bev', 'phev', 'hybrid'] },
  { id: 'bev', label: '纯电', icon: '🔋' },
  { id: 'phev', label: '插混', icon: '🔌' },
  { id: 'hybrid', label: '混动', icon: '🔋' },
  { id: 'petrol', label: '燃油', icon: '⛽' },
];

export default function FilterBar({ onFilterChange, activeBody, activePowertrain }: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* 车型分类 */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">车型分类</h3>
        <div className="flex flex-wrap gap-2">
          {bodyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onFilterChange('body', type.id === 'all' ? null : type.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                (type.id === 'all' && !activeBody) || activeBody === type.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 动力类型 */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">动力类型</h3>
        <div className="flex flex-wrap gap-2">
          {powertrainTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => onFilterChange('powertrain', type.id === 'all' ? null : type.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                (type.id === 'all' && !activePowertrain) || activePowertrain === type.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
