'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { page = 1, pageSize = 10 } = event;
  
  try {
    // 获取产品列表
    const productResult = await db.collection('products')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .orderBy('create_date', 'desc')
      .get();
    
    // 获取轮播图数据
    const bannerResult = await db.collection('banners')
      .orderBy('sort', 'asc')
      .orderBy('create_date', 'desc')
      .get();
    
    return {
      code: 0,
      message: 'success',
      data: {
        products: productResult.data,
        banners: bannerResult.data,
        total: productResult.total || 0
      }
    };
  } catch (error) {
    return {
      code: -1,
      message: error.message,
      data: null
    };
  }
};