# 汽车百科数据模型 (Data Schema)

## 数据层级

```
Brand (品牌)
  └── Series (车系)
        └── Generation (代际)
              └── Variant (具体车型/配置)
```

## Brand 品牌

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✓ | 唯一标识，如 "bmw" |
| name_cn | string | ✓ | 中文名 |
| name_en | string | ✓ | 英文名 |
| country | string | ✓ | 所属国家 |
| region | string | ✓ | 地区: europe/japan/usa/china/korea/other |
| founded_year | number | ✓ | 成立年份 |
| logo | string | ✓ | Logo 图片路径 |
| intro | string | ✓ | 品牌简介 |
| history | TimelineEvent[] | | 品牌历史时间线 |
| official_site | string | | 官网链接 |
| media | Media[] | | 品牌相关媒体 |
| sources | string[] | | 数据来源 |

## Series 车系

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✓ | 唯一标识，如 "bmw-3-series" |
| brand_id | string | ✓ | 所属品牌 ID |
| name_cn | string | ✓ | 中文名 |
| name_en | string | ✓ | 英文名 |
| intro | string | ✓ | 车系简介 |
| category | string | ✓ | 类别: sedan/suv/mpv/coupe/convertible/hatchback/wagon/pickup |
| generations | Generation[] | ✓ | 代际列表 |
| media | Media[] | | 媒体资源 |

## Generation 代际

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✓ | 如 "g20" |
| name | string | ✓ | 代际名称 |
| year_start | number | ✓ | 起始年份 |
| year_end | number | | 结束年份（在产留空） |
| platform | string | | 平台代号 |
| variants | Variant[] | ✓ | 具体车型列表 |

## Variant 具体车型

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✓ | 如 "bmw-330i-g20" |
| name | string | ✓ | 车型名称 |
| year | number | ✓ | 年款 |
| body_type | string | ✓ | 车身形式 |
| powertrain | string | ✓ | 动力类型: petrol/diesel/hybrid/phev/bev |
| engine | string | | 发动机描述 |
| transmission | string | | 变速箱 |
| drivetrain | string | | 驱动方式: fwd/rwd/awd |
| specs | Specs | ✓ | 参数 |
| price_range | string | | 价格区间 |
| images | Media[] | | 图片 |
| videos | Media[] | | 视频 |

## Specs 参数

| 字段 | 类型 | 单位 |
|------|------|------|
| length | number | mm |
| width | number | mm |
| height | number | mm |
| wheelbase | number | mm |
| weight | number | kg |
| power | number | hp |
| torque | number | Nm |
| displacement | number | L |
| zero_to_hundred | number | 秒 |
| top_speed | number | km/h |
| fuel_consumption | number | L/100km |
| range | number | km (纯电) |
| battery | number | kWh (电池容量) |

## Media 媒体资源

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | ✓ | image/video |
| url | string | ✓ | 资源 URL |
| thumbnail | string | | 缩略图路径 |
| source_url | string | | 原始来源链接 |
| license | string | | 许可类型 |
| credit | string | | 版权归属 |
| caption | string | | 图片/视频说明 |

## TimelineEvent 时间线事件

| 字段 | 类型 | 说明 |
|------|------|------|
| year | number | 年份 |
| event | string | 事件描述 |

## 地区枚举

- europe (欧洲)
- japan (日本)
- usa (美国)
- china (中国)
- korea (韩国)
- other (其他)
