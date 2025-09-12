'use strict';

exports.main = async (event, context) => {
  const db = uniCloud.database();
  const { page = 1, pageSize = 10, style = 'all' } = event;
  
  try {
    // 构建查询条件
    let whereCondition = {};
    if (style && style !== 'all') {
      whereCondition.style = style;
    }
    
    // 计算跳过的记录数
    const skip = (page - 1) * pageSize;
    
    // 查询案例列表
    const casesResult = await db.collection('cases')
      .where(whereCondition)
      .skip(skip)
      .limit(pageSize)
      .orderBy('create_date', 'desc')
      .get();
    
    // 查询总数
    const countResult = await db.collection('cases')
      .where(whereCondition)
      .count();
    
    return {
      code: 0,
      message: '获取案例列表成功',
      data: {
        cases: casesResult.data,
        total: countResult.total,
        page: page,
        pageSize: pageSize,
        hasMore: skip + pageSize < countResult.total
      }
    };
    
  } catch (error) {
    console.error('获取案例列表失败:', error);
    return {
      code: -1,
      message: '获取案例列表失败',
      error: error.message
    };
  }
};