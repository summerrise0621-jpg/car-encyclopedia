# 🚗 汽车百科 (Car Encyclopedia)

一个可持续扩展的汽车百科站点，包含品牌历史、车型参数、媒体资源和智能搜索。

## 项目结构

```
car-encyclopedia/
├── apps/
│   └── web/              # Next.js 前端应用
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

- **前端**: Next.js + TypeScript + Tailwind CSS
- **内容**: JSON 结构化数据
- **搜索**: FlexSearch (客户端静态搜索)
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
BMW → 3 Series → G20 → 330i / M340i / 330e
```

## 内容来源

- 维基百科 (CC BY-SA)
- 品牌官方网站
- 汽车之家、懂车帝等公开数据

## 路线图

- **V1**: 品牌页、车型页、基础搜索、响应式布局
- **V2**: 车型对比、筛选器、图库优化
- **V3**: 内容管理后台、批量导入
- **V4**: 用户收藏、评分、国际化

## 许可证

[MIT License](LICENSE)
