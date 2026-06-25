# 🚗 汽车百科 (Car Encyclopedia)

一个可持续扩展的汽车百科站点，包含品牌历史、车型参数、媒体资源和智能搜索。

## 品牌覆盖

### 欧洲 (14 个)
| 品牌 | 国家 | 成立 | 代表车系 |
|------|------|------|---------|
| BMW 宝马 | 德国 | 1916 | 3系、5系、7系、X3、X5 |
| Mercedes-Benz 奔驰 | 德国 | 1926 | C级、E级、S级、GLC、G级 |
| Audi 奥迪 | 德国 | 1909 | A4、A6、Q5、Q7、e-tron |
| Volkswagen 大众 | 德国 | 1937 | 高尔夫、帕萨特、途观、ID.4 |
| Porsche 保时捷 | 德国 | 1931 | 911、Cayenne、Taycan |
| Volvo 沃尔沃 | 瑞典 | 1927 | XC60、S60、XC90 |
| Land Rover 路虎 | 英国 | 1948 | 揽胜、卫士 |
| MINI | 英国 | 1959 | Cooper |
| Peugeot 标致 | 法国 | 1810 | 308、3008 |
| Lamborghini 兰博基尼 | 意大利 | 1963 | Huracán、Urus |
| Ferrari 法拉利 | 意大利 | 1939 | 296 GTB、SF90 |
| Rolls-Royce 劳斯莱斯 | 英国 | 1904 | 古思特、库里南 |

### 日本 (5 个)
| 品牌 | 成立 | 代表车系 |
|------|------|---------|
| Toyota 丰田 | 1937 | 卡罗拉、凯美瑞、RAV4、兰德酷路泽、普锐斯 |
| Honda 本田 | 1948 | 思域、雅阁、CR-V、Pilot |
| Nissan 日产 | 1933 | GT-R、Ariya、天籁 |
| Mazda 马自达 | 1920 | 马自达3、CX-5、MX-5、CX-30 |
| Lexus 雷克萨斯 | 1989 | RX、ES、NX |
| Subaru 斯巴鲁 | 1953 | 森林人、傲虎、WRX |

### 美国 (4 个)
| 品牌 | 成立 | 代表车系 |
|------|------|---------|
| Ford 福特 | 1903 | 野马、探险者、F-150 |
| Tesla 特斯拉 | 2003 | Model 3、Model Y、Model S、Cybertruck |
| Chevrolet 雪佛兰 | 1911 | 克尔维特、科迈罗、Silverado |
| Cadillac 凯迪拉克 | 1902 | 凯雷德、CT5 |
| Jeep 吉普 | 1941 | 牧马人、大切诺基 |

### 中国 (7 个)
| 品牌 | 成立 | 代表车系 |
|------|------|---------|
| BYD 比亚迪 | 1995 | 汉、海豹、宋、秦、元 |
| Geely 吉利 | 1986 | 帝豪、星越L、极氪001 |
| NIO 蔚来 | 2014 | ES6、ET7、ET5 |
| Xpeng 小鹏 | 2014 | P7、G9、G6 |
| Li Auto 理想 | 2015 | L9、L7、L8 |
| Changan 长安 | 1862 | UNI-V、CS75 |
| Chery 奇瑞 | 1997 | 瑞虎8、艾瑞泽8 |

### 韩国 (2 个)
| 品牌 | 成立 | 代表车系 |
|------|------|---------|
| Hyundai 现代 | 1967 | IONIQ 5、途胜、索纳塔 |
| Kia 起亚 | 1944 | Sportage、EV6、K5 |

**共计: 32 个品牌, 80+ 车系**

## 项目结构

```
car-encyclopedia/
├── apps/
│   └── web/              # Next.js 16 前端应用
├── content/
│   ├── brands/           # 品牌数据 (JSON)
│   ├── models/           # 车系/车型数据 (JSON)
│   └── media/            # 媒体资源元数据
├── public/
│   └── images/           # 图片资源
├── scripts/
│   ├── import/           # 数据导入脚本
│   └── validate/         # 数据校验脚本
└── docs/
    ├── data-schema.md    # 数据模型文档
    └── roadmap.md        # 项目路线图
```

## 技术栈

- **前端**: Next.js 16 + TypeScript + Tailwind CSS 4
- **内容**: JSON 结构化数据
- **搜索**: 客户端静态搜索
- **部署**: Vercel / Cloudflare Pages

## 快速开始

```bash
# 安装依赖
cd apps/web && npm install

# 启动开发服务器
npm run dev

# 校验数据
python scripts/validate/validate-data.py

# 构建
npm run build
```

## 数据层级

```
Brand (品牌) → Series (车系) → Generation (代际) → Variant (车型配置)
```

示例:
```
BMW → 3 Series → G20 (第七代) → 325Li / 330Li
```

## 内容来源

- 品牌官方网站
- 维基百科 (CC BY-SA)
- 公开汽车数据

## 路线图

- **V1**: ✅ 品牌页、车型页、基础搜索、响应式布局
- **V2**: 车型对比、筛选器、图库优化
- **V3**: 内容管理后台、批量导入
- **V4**: 用户收藏、评分、国际化

## 许可证

[MIT License](LICENSE)
