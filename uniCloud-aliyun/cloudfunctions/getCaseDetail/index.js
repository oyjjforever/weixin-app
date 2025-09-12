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