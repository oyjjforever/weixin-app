'use strict';

const db = uniCloud.database();
const dbCmd = db.command;
const $ = dbCmd.aggregate;

exports.main = async (event, context) => {
  const { type, limit = 10 } = event;
  
  try {
    // 获取当前时间戳
    const now = Date.now();
    
    // 构建查询条件
    let where = {
      status: 'active'
    };
    
    // 添加时间范围条件
    where.startTime = dbCmd.lte(now);
    where.endTime = dbCmd.gte(now);
    
    // 如果指定了类型，添加类型筛选
    if (type && ['promotion', 'announcement', 'maintenance'].includes(type)) {
      where.type = type;
    }
    
    // 获取通知列表
    const result = await db.collection('notifications')
      .where(where)
      .orderBy('priority', 'desc')  // 优先级高的在前
      .orderBy('sort', 'asc')       // 排序值小的在前
      .orderBy('create_date', 'desc') // 创建时间新的在前
      .limit(limit)
      .get();
    
    return {
      code: 0,
      message: 'success',
      data: {
        notices: result.data || [],
        total: result.data?.length || 0
      }
    };
  } catch (error) {
    console.error('获取通知列表失败:', error);
    return {
      code: -1,
      message: error.message || '获取通知列表失败',
      data: null
    };
  }
};
