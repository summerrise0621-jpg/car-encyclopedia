# 数据导入脚本

## 使用方法

### 从 CSV 导入品牌数据
```bash
python scripts/import/import-brands.py --input brands.csv
```

### 从 CSV 导入车型数据
```bash
python scripts/import/import-models.py --input models.csv
```

## CSV 格式要求

### brands.csv
```
id,name_cn,name_en,country,region,founded_year,logo,intro
bmw,宝马,BMW,德国,europe,1916,/images/brands/bmw.png,宝马是德国著名汽车品牌...
```

### models.csv
```
id,brand_id,name_cn,name_en,intro,category
bmw-3-series,bmw,3系,3 Series,宝马最畅销的中型轿车,sedan
```

## 注意事项
- 导入前请先运行 validate-data.py 校验
- 图片路径使用相对路径
- 大文件建议分批导入
