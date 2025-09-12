'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { id } = event;
  
  if (!id) {
    return {
      code: -1,
      message: '产品ID不能为空',
      data: null
    };
  }
  
  try {
    // 获取产品详情
    const result = await db.collection('products')
      .doc(id)
      .get();
    
    if (result.data.length === 0) {
      return {
        code: -1,
        message: '产品不存在',
        data: null
      };
    }
    
    return {
      code: 0,
      message: 'success',
      data: result.data[0]
    };
  } catch (error) {
    return {
      code: -1,
      message: error.message,
      data: null
    };
  }
};