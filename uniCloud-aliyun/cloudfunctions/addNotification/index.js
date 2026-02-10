'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const { title, content, type, image, linkUrl, linkType, priority, status, startTime, endTime, sort } = event;
  
  try {
    // 验证必填字段
    if (!title || !content || !type || !status) {
      return {
        code: -1,
        message: '缺少必填字段：title、content、type、status',
        data: null
      };
    }
    
    // 验证通知类型
    const validTypes = ['promotion', 'announcement', 'maintenance'];
    if (!validTypes.includes(type)) {
      return {
        code: -1,
        message: '无效的通知类型',
        data: null
      };
    }
    
    // 验证状态
    const validStatuses = ['active', 'inactive', 'expired'];
    if (!validStatuses.includes(status)) {
      return {
        code: -1,
        message: '无效的状态',
        data: null
      };
    }
    
    // 验证链接类型
    if (linkType) {
      const validLinkTypes = ['none', 'page', 'url', 'product'];
      if (!validLinkTypes.includes(linkType)) {
        return {
          code: -1,
          message: '无效的链接类型',
          data: null
        };
      }
    }
    
    // 验证优先级
    if (priority !== undefined && (priority < 1 || priority > 10)) {
      return {
        code: -1,
        message: '优先级必须在1-10之间',
        data: null
      };
    }
    
    // 构建通知数据
    const noticeData = {
      title,
      content,
      type,
      status
    };
    
    // 添加可选字段
    if (image) noticeData.image = image;
    if (linkUrl) noticeData.linkUrl = linkUrl;
    if (linkType) noticeData.linkType = linkType;
    if (priority !== undefined) noticeData.priority = priority;
    if (startTime !== undefined) noticeData.startTime = startTime;
    if (endTime !== undefined) noticeData.endTime = endTime;
    if (sort !== undefined) noticeData.sort = sort;
    
    // 添加通知
    const result = await db.collection('notifications').add(noticeData);
    
    return {
      code: 0,
      message: '添加通知成功',
      data: {
        id: result.id
      }
    };
  } catch (error) {
    console.error('添加通知失败:', error);
    return {
      code: -1,
      message: error.message || '添加通知失败',
      data: null
    };
  }
};
