import type { TimelineEvent } from '@/types';

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  if (!events || events.length === 0) return null;

  // 按年份排序
  const sorted = [...events].sort((a, b) => a.year - b.year);

  return (
    <div className="relative">
      {/* 竖线 */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

      <div className="space-y-6">
        {sorted.map((event, i) => (
          <div key={i} className="relative pl-12">
            {/* 圆点 */}
            <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800 shadow" />

            {/* 内容 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              <span className="inline-block px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm font-semibold mb-2">
                {event.year}年
              </span>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {event.event}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
