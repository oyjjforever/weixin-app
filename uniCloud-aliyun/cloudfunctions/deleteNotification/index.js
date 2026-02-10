'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { id } = event;
  
  try {
    // 验证必填字段
    if (!id) {
      return {
        code: -1,
        message: '缺少通知ID',
        data: null
      };
    }
    
    // 检查通知是否存在
    const existResult = await db.collection('notifications').doc(id).get();
    if (!existResult.data || existResult.data.length === 0) {
      return {
        code: -1,
        message: '通知不存在',
        data: null
      };
    }
    
    // 删除通知
    const result = await db.collection('notifications').doc(id).remove();
    
    return {
      code: 0,
      message: '删除通知成功',
      data: {
        deleted: result.deleted
      }
    };
  } catch (error) {
    console.error('删除通知失败:', error);
    return {
      code: -1,
      message: error.message || '删除通知失败',
      data: null
    };
  }
};
