'use strict';

exports.main = async (event, context) => {
  const db = uniCloud.database();
  const { id } = event;
  
  if (!id) {
    return {
      code: -1,
      message: '案例ID不能为空'
    };
  }
  
  try {
    // 查询案例详情
    const caseResult = await db.collection('cases')
      .doc(id)
      .get();
    
    if (caseResult.data.length === 0) {
      return {
        code: -1,
        message: '案例不存在'
      };
    }
    
    const caseData = caseResult.data[0];
    
    // 关联查询产品信息
    if (caseData.furnitureCategories && caseData.furnitureCategories.length > 0) {
      // 收集所有产品ID
      const productIds = [];
      caseData.furnitureCategories.forEach(category => {
        if (category.products && category.products.length > 0) {
          productIds.push(...category.products);
        }
      });
      
      // 查询产品详情
      if (productIds.length > 0) {
        const productsResult = await db.collection('products')
          .where({
            _id: db.command.in(productIds)
          })
          .get();
        
        // 创建产品ID到产品信息的映射
        const productMap = {};
        productsResult.data.forEach(product => {
          productMap[product._id] = {
            id: product._id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            designer: product.designer
          };
        });
        
        // 替换产品ID为完整产品信息
        caseData.furnitureCategories.forEach(category => {
          if (category.products && category.products.length > 0) {
            category.products = category.products.map(productId => {
              return productMap[productId] || null;
            }).filter(product => product !== null);
          }
        });
      }
    }
    
    // 更新浏览次数
    await db.collection('cases')
      .doc(id)
      .update({
        viewCount: db.command.inc(1)
      });
    
    return {
      code: 0,
      message: '获取案例详情成功',
      data: caseData
    };
    
  } catch (error) {
    console.error('获取案例详情失败:', error);
    return {
      code: -1,
      message: '获取案例详情失败',
      error: error.message
    };
  }
};