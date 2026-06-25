import type { Specs } from '@/types';

interface SpecsTableProps {
  specs: Specs;
  title?: string;
}

const specLabels: Record<string, string> = {
  length: '长度 (mm)',
  width: '宽度 (mm)',
  height: '高度 (mm)',
  wheelbase: '轴距 (mm)',
  weight: '整备质量 (kg)',
  power: '最大功率 (hp)',
  torque: '最大扭矩 (Nm)',
  displacement: '排量 (L)',
  zero_to_hundred: '0-100km/h (秒)',
  top_speed: '最高时速 (km/h)',
  fuel_consumption: '油耗 (L/100km)',
  range: '纯电续航 (km)',
  battery: '电池容量 (kWh)',
};

const specOrder = [
  'power',
  'torque',
  'displacement',
  'zero_to_hundred',
  'top_speed',
  'fuel_consumption',
  'range',
  'battery',
  'length',
  'width',
  'height',
  'wheelbase',
  'weight',
];

export default function SpecsTable({ specs, title }: SpecsTableProps) {
  const entries = specOrder
    .filter((key) => specs[key as keyof Specs] !== undefined)
    .map((key) => ({
      key,
      label: specLabels[key] || key,
      value: specs[key as keyof Specs],
    }));

  if (entries.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {title && (
        <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {entries.map(({ key, label, value }) => (
          <div
            key={key}
            className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-750"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
