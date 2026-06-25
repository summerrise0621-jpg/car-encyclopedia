'use client';

interface FilterBarProps {
  regions?: string[];
  bodyTypes?: string[];
  powertrains?: string[];
  selectedRegion?: string;
  selectedBodyType?: string;
  selectedPowertrain?: string;
  onRegionChange?: (region: string) => void;
  onBodyTypeChange?: (bodyType: string) => void;
  onPowertrainChange?: (powertrain: string) => void;
}

const regionLabels: Record<string, string> = {
  europe: '欧洲',
  japan: '日本',
  usa: '美国',
  china: '中国',
  korea: '韩国',
  other: '其他',
};

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

export default function FilterBar({
  regions = ['europe', 'japan', 'usa', 'china', 'korea'],
  bodyTypes = ['sedan', 'suv', 'mpv', 'coupe', 'convertible', 'hatchback'],
  powertrains = ['petrol', 'diesel', 'hybrid', 'phev', 'bev'],
  selectedRegion,
  selectedBodyType,
  selectedPowertrain,
  onRegionChange,
  onBodyTypeChange,
  onPowertrainChange,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* 地区筛选 */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          按地区
        </h4>
        <div className="flex flex-wrap gap-2">
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => onRegionChange?.(selectedRegion === r ? '' : r)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedRegion === r
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {regionLabels[r] || r}
            </button>
          ))}
        </div>
      </div>

      {/* 车身类型筛选 */}
      {onBodyTypeChange && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            按车身类型
          </h4>
          <div className="flex flex-wrap gap-2">
            {bodyTypes.map((bt) => (
              <button
                key={bt}
                onClick={() => onBodyTypeChange(selectedBodyType === bt ? '' : bt)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedBodyType === bt
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {bodyTypeLabels[bt] || bt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 动力类型筛选 */}
      {onPowertrainChange && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            按动力类型
          </h4>
          <div className="flex flex-wrap gap-2">
            {powertrains.map((pt) => (
              <button
                key={pt}
                onClick={() => onPowertrainChange(selectedPowertrain === pt ? '' : pt)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  selectedPowertrain === pt
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {powertrainLabels[pt] || pt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
