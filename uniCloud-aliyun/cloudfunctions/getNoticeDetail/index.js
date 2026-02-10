'use strict';

const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
  const { id } = event;
  
  try {
    if (!id) {
      return {
        code: -1,
        message: '缺少通知ID',
        data: null
      };
    }
    
    // 获取通知详情
    const result = await db.collection('notifications')
      .doc(id)
      .get();
    
    if (!result.data || result.data.length === 0) {
      return {
        code: -1,
        message: '通知不存在',
        data: null
      };
    }
    
    return {
      code: 0,
      message: 'success',
      data: result.data[0]
    };
  } catch (error) {
    console.error('获取通知详情失败:', error);
    return {
      code: -1,
      message: error.message || '获取通知详情失败',
      data: null
    };
  }
};
