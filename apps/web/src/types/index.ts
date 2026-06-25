// 汽车百科核心数据类型

export type Region = 'europe' | 'japan' | 'usa' | 'china' | 'korea' | 'other';

export type BodyType = 'sedan' | 'suv' | 'mpv' | 'coupe' | 'convertible' | 'hatchback' | 'wagon' | 'pickup';

export type Powertrain = 'petrol' | 'diesel' | 'hybrid' | 'phev' | 'bev';

export type Drivetrain = 'fwd' | 'rwd' | 'awd';

export interface TimelineEvent {
  year: number;
  event: string;
}

export interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  source_url?: string;
  license?: string;
  credit?: string;
  caption?: string;
}

export interface Specs {
  length?: number;      // mm
  width?: number;       // mm
  height?: number;      // mm
  wheelbase?: number;   // mm
  weight?: number;      // kg
  power?: number;       // hp
  torque?: number;      // Nm
  displacement?: number; // L
  zero_to_hundred?: number; // 秒
  top_speed?: number;   // km/h
  fuel_consumption?: number; // L/100km
  range?: number;       // km (纯电续航)
  battery?: number;     // kWh
}

export interface Variant {
  id: string;
  name: string;
  year: number;
  body_type: BodyType;
  powertrain: Powertrain;
  engine?: string;
  transmission?: string;
  drivetrain?: Drivetrain;
  specs: Specs;
  price_range?: string;
  images?: Media[];
  videos?: Media[];
}

export interface Generation {
  id: string;
  name: string;
  year_start: number;
  year_end?: number;
  platform?: string;
  variants: Variant[];
}

export interface Series {
  id: string;
  brand_id: string;
  name_cn: string;
  name_en: string;
  intro: string;
  category: BodyType;
  generations: Generation[];
  media?: Media[];
}

export interface Brand {
  id: string;
  name_cn: string;
  name_en: string;
  country: string;
  region: Region;
  founded_year: number;
  logo: string;
  intro: string;
  history?: TimelineEvent[];
  official_site?: string;
  media?: Media[];
  sources?: string[];
}

// 搜索索引条目
export interface SearchEntry {
  id: string;
  type: 'brand' | 'series' | 'variant';
  title: string;
  subtitle: string;
  brand_id?: string;
  series_id?: string;
  tags: string[];
}
