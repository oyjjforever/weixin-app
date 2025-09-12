# UniCloud 数据获取实现说明

## 概述
本项目已集成 uni-cloud 技术，通过云函数接口获取产品列表和详情信息，替代了原有的静态数据。

## 文件结构

### 数据库相关
- `uniCloud-aliyun/database/db_init.json` - 数据库集合结构定义
- `uniCloud-aliyun/database/init_data.jql` - 初始化测试数据
- `uniCloud-aliyun/database/JQL查询.jql` - JQL查询示例

### 云函数
- `uniCloud-aliyun/cloudfunctions/getProductList/` - 获取产品列表和轮播图
- `uniCloud-aliyun/cloudfunctions/getProductDetail/` - 获取产品详情

### 前端页面
- `pages/index/index.vue` - 首页列表页面（已修改为使用云函数）
- `pages/index/detail.vue` - 产品详情页面（已修改为使用云函数）

## 数据库集合

### products 集合（产品信息表）
```json
{
  "_id": "产品ID",
  "name": "产品名称",
  "image": "产品图片URL",
  "description": "产品描述",
  "designer": "设计师",
  "duration": "工期",
  "difficulty": "难度",
  "rating": "评分",
  "price": "价格",
  "sales": "销量",
  "size": "尺寸",
  "material": "材质",
  "color": "颜色",
  "features": ["产品特点数组"],
  "sceneDesc": "适用场景描述",
  "isFavorite": "是否收藏",
  "create_date": "创建时间"
}
```

### banners 集合（轮播图表）
```json
{
  "_id": "轮播图ID",
  "image": "图片URL",
  "title": "标题",
  "description": "描述",
  "isFavorite": "是否收藏",
  "sort": "排序",
  "create_date": "创建时间"
}
```

## 云函数接口

### getProductList
**功能**: 获取产品列表和轮播图数据
**参数**:
- `page`: 页码（默认1）
- `pageSize`: 每页数量（默认10）

**返回**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "products": "产品列表数组",
    "banners": "轮播图数组",
    "total": "总数量"
  }
}
```

### getProductDetail
**功能**: 获取单个产品详情
**参数**:
- `id`: 产品ID

**返回**:
```json
{
  "code": 0,
  "message": "success",
  "data": "产品详情对象"
}
```

## 使用步骤

### 1. 初始化数据库
1. 在 HBuilderX 中右键点击 `uniCloud-aliyun/database/db_init.json`
2. 选择"初始化云数据库"来创建集合结构

### 2. 插入测试数据
1. 打开 `uniCloud-aliyun/database/init_data.jql`
2. 选中所有代码并运行，插入测试数据

### 3. 上传云函数
1. 右键点击 `uniCloud-aliyun/cloudfunctions/getProductList`
2. 选择"上传并运行"
3. 对 `getProductDetail` 重复相同操作

### 4. 测试功能
- 运行项目，首页会自动调用云函数获取数据
- 点击产品卡片进入详情页，会根据产品ID获取详细信息

## 特性

### 数据获取优化
- 首页同时获取产品列表和轮播图，减少请求次数
- 详情页支持通过产品ID获取完整信息
- 兼容原有的URL参数传递方式

### 错误处理
- 网络错误时显示友好提示
- 接口失败时自动降级到默认数据
- 完整的错误日志记录

### 性能优化
- 分页加载支持
- 数据缓存机制
- 按需加载详情信息

## 注意事项

1. **云服务空间**: 确保已创建并关联 uniCloud 服务空间
2. **权限配置**: 数据库集合需要配置适当的读写权限
3. **数据同步**: 修改数据库结构后需要重新初始化
4. **错误处理**: 生产环境建议完善错误处理和用户提示

## 扩展功能

### 可添加的功能
- 产品搜索和筛选
- 用户收藏功能
- 产品评价系统
- 图片上传和管理
- 数据统计和分析

### 性能优化建议
- 添加数据缓存
- 实现图片懒加载
- 优化数据库查询索引
- 使用CDN加速图片加载