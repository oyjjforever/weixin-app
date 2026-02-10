'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { id, title, content, type, image, linkUrl, linkType, priority, status, startTime, endTime, sort } = event;
  
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
    
    // 构建更新数据
    const updateData = {};
    
    // 添加要更新的字段
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (type !== undefined) {
      const validTypes = ['promotion', 'announcement', 'maintenance'];
      if (!validTypes.includes(type)) {
        return {
          code: -1,
          message: '无效的通知类型',
          data: null
        };
      }
      updateData.type = type;
    }
    if (image !== undefined) updateData.image = image;
    if (linkUrl !== undefined) updateData.linkUrl = linkUrl;
    if (linkType !== undefined) {
      const validLinkTypes = ['none', 'page', 'url', 'product'];
      if (!validLinkTypes.includes(linkType)) {
        return {
          code: -1,
          message: '无效的链接类型',
          data: null
        };
      }
      updateData.linkType = linkType;
    }
    if (priority !== undefined) {
      if (priority < 1 || priority > 10) {
        return {
          code: -1,
          message: '优先级必须在1-10之间',
          data: null
        };
      }
      updateData.priority = priority;
    }
    if (status !== undefined) {
      const validStatuses = ['active', 'inactive', 'expired'];
      if (!validStatuses.includes(status)) {
        return {
          code: -1,
          message: '无效的状态',
          data: null
        };
      }
      updateData.status = status;
    }
    if (startTime !== undefined) updateData.startTime = startTime;
    if (endTime !== undefined) updateData.endTime = endTime;
    if (sort !== undefined) updateData.sort = sort;
    
    // 检查是否有需要更新的字段
    if (Object.keys(updateData).length === 0) {
      return {
        code: -1,
        message: '没有需要更新的字段',
        data: null
      };
    }
    
    // 更新通知
    const result = await db.collection('notifications').doc(id).update(updateData);
    
    return {
      code: 0,
      message: '更新通知成功',
      data: {
        updated: result.updated
      }
    };
  } catch (error) {
    console.error('更新通知失败:', error);
    return {
      code: -1,
      message: error.message || '更新通知失败',
      data: null
    };
  }
};
