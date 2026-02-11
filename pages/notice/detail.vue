<template>
  <view class="container">
    <!-- 顶部导航区域 -->
    <!-- <view class="nav-bar">
      <view class="nav-left" @click="goBack">
        <uni-icons type="back" size="24" color="#ffffff"></uni-icons>
      </view>
      <view class="nav-title">
        <text>通知详情</text>
      </view>
      <view class="nav-right">
        <uni-icons type="redo" size="24" color="#ffffff" @click="handleShare"></uni-icons>
      </view>
    </view> -->

    <!-- 通知内容区域 -->
    <view class="content-container" v-if="noticeInfo">
      <!-- 通知类型标签 -->
      <view class="type-badge" :class="'type-' + noticeInfo.type">
        <text>{{ getTypeText(noticeInfo.type) }}</text>
      </view>

      <!-- 通知标题 -->
      <view class="title-section">
        <text class="notice-title">{{ noticeInfo.title }}</text>
        <view class="notice-meta">
          <text class="publish-time">发布时间：{{ formatDate(noticeInfo.create_date) }}</text>
          <text class="valid-time" v-if="noticeInfo.endTime">
            有效期至：{{ formatDate(noticeInfo.endTime) }}
          </text>
        </view>
      </view>

      <!-- 通知图片 -->
      <view class="image-section" v-if="noticeInfo.image">
        <image :src="noticeInfo.image" mode="widthFix" class="notice-image" @click="previewImage"></image>
      </view>

      <!-- 通知内容 -->
      <view class="content-section">
        <text class="content-text">{{ noticeInfo.content }}</text>
      </view>

      <!-- 操作按钮 -->
      <view class="action-section" v-if="noticeInfo.linkType && noticeInfo.linkType !== 'none'">
        <view class="action-btn" @click="handleLinkClick">
          <text>{{ getActionText(noticeInfo.linkType) }}</text>
          <uni-icons type="right" size="18" color="#ffffff"></uni-icons>
        </view>
      </view>

      <!-- 底部信息 -->
      <view class="footer-section">
        <view class="footer-item">
          <uni-icons type="calendar" size="16" color="#999"></uni-icons>
          <text class="footer-text">创建于：{{ formatDateTime(noticeInfo.create_date) }}</text>
        </view>
        <view class="footer-item" v-if="noticeInfo.update_date && noticeInfo.update_date !== noticeInfo.create_date">
          <uni-icons type="refresh" size="16" color="#999"></uni-icons>
          <text class="footer-text">更新于：{{ formatDateTime(noticeInfo.update_date) }}</text>
        </view>
      </view>
    </view>

    <!-- 加载状态 -->
    <view class="loading-state" v-else-if="loading">
      <uni-icons type="spinner-cycle" size="48" color="#999"></uni-icons>
      <text class="loading-text">加载中...</text>
    </view>

    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <uni-icons type="info" size="64" color="#d9d9d9"></uni-icons>
      <text class="empty-text">通知不存在或已被删除</text>
      <view class="back-btn" @click="goBack">
        <text>返回</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

interface NoticeInfo {
  _id?: string;
  title: string;
  content: string;
  type: 'promotion' | 'announcement' | 'maintenance';
  image?: string;
  linkUrl?: string;
  linkType?: 'none' | 'page' | 'url' | 'product';
  priority?: number;
  status?: string;
  startTime?: number;
  endTime?: number;
  sort?: number;
  create_date?: number;
  update_date?: number;
}

const noticeInfo = ref<NoticeInfo | null>(null);
const loading = ref(false);

// 获取通知详情数据
const getNoticeDetail = async (noticeId: string) => {
  loading.value = true;
  try {
    const result = await uniCloud.callFunction({
      name: 'getNoticeDetail',
      data: { id: noticeId }
    });
    
    if (result.result.code === 0) {
      noticeInfo.value = result.result.data;
    } else {
      uni.showToast({
        title: result.result.message || '获取通知详情失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('获取通知详情失败:', error);
    uni.showToast({
      title: '网络错误，请重试',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

// 获取通知类型文本
const getTypeText = (type: string) => {
  const typeMap: Record<string, string> = {
    promotion: '促销活动',
    announcement: '公告',
    maintenance: '维护通知'
  };
  return typeMap[type] || '通知';
};

// 获取操作按钮文本
const getActionText = (linkType: string) => {
  const actionMap: Record<string, string> = {
    page: '查看详情',
    url: '访问链接',
    product: '查看产品'
  };
  return actionMap[linkType] || '了解更多';
};

// 格式化日期
const formatDate = (timestamp?: number) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// 格式化日期时间
const formatDateTime = (timestamp?: number) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// 预览图片
const previewImage = () => {
  if (noticeInfo.value && noticeInfo.value.image) {
    uni.previewImage({
      urls: [noticeInfo.value.image],
      current: noticeInfo.value.image
    });
  }
};

// 处理链接点击
const handleLinkClick = () => {
  if (!noticeInfo.value) return;
  
  const { linkType, linkUrl } = noticeInfo.value;
  
  if (!linkUrl) {
    uni.showToast({
      title: '链接地址无效',
      icon: 'none'
    });
    return;
  }

  switch (linkType) {
    case 'page':
      uni.navigateTo({
        url: linkUrl,
        fail: () => {
          uni.switchTab({
            url: linkUrl,
            fail: () => {
              uni.showToast({
                title: '页面跳转失败',
                icon: 'none'
              });
            }
          });
        }
      });
      break;
    case 'url':
      // #ifdef H5
      window.open(linkUrl, '_blank');
      // #endif
      // #ifndef H5
      uni.showModal({
        title: '提示',
        content: '是否在浏览器中打开链接？',
        success: (res) => {
          if (res.confirm) {
            plus.runtime.openURL(linkUrl);
          }
        }
      });
      // #endif
      break;
    case 'product':
      uni.navigateTo({
        url: `/pages/index/detail?id=${linkUrl}`,
        fail: () => {
          uni.showToast({
            title: '产品详情跳转失败',
            icon: 'none'
          });
        }
      });
      break;
    default:
      break;
  }
};

// 返回上一页
const goBack = () => {
  uni.navigateBack();
};

// 分享
const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true
  });
};

// 页面加载时获取数据
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;
  
  if (options && options.id) {
    getNoticeDetail(options.id);
  } else {
    uni.showToast({
      title: '缺少通知ID',
      icon: 'none'
    });
  }
});
</script>

<style scoped>
page {
  height: 100%;
  background-color: #f5f5f5;
}

.container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  padding-top: var(--status-bar-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.nav-left {
  display: flex;
  align-items: center;
  padding: 10rpx;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.nav-left:active {
  background-color: rgba(255, 255, 255, 0.3);
}

.nav-title {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-title text {
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
}

.nav-right {
  display: flex;
  gap: 40rpx;
}

.content-container {
  padding: 30rpx 40rpx;
  background-color: #ffffff;
  min-height: 100%;
}

.type-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8rpx 24rpx;
  border-radius: 30rpx;
  margin-bottom: 30rpx;
}

.type-promotion {
  background: linear-gradient(90deg, #ff6b6b 0%, #ff8e53 100%);
}

.type-announcement {
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
}

.type-maintenance {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.type-badge text {
  font-size: 14px;
  color: #ffffff;
  font-weight: 500;
}

.title-section {
  margin-bottom: 30rpx;
}

.notice-title {
  display: block;
  font-size: 22px;
  font-weight: bold;
  color: #333333;
  line-height: 1.4;
  margin-bottom: 20rpx;
}

.notice-meta {
  display: flex;
  flex-direction: column;
  gap: 10rpx;
}

.publish-time,
.valid-time {
  font-size: 14px;
  color: #999999;
}

.image-section {
  margin-bottom: 30rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.notice-image {
  width: 100%;
  display: block;
  border-radius: 16rpx;
}

.content-section {
  padding: 30rpx;
  background-color: #f8f9fa;
  border-radius: 16rpx;
  margin-bottom: 30rpx;
}

.content-text {
  font-size: 16px;
  color: #333333;
  line-height: 1.8;
  white-space: pre-wrap;
}

.action-section {
  margin-bottom: 30rpx;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  padding: 24rpx 48rpx;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  border-radius: 50rpx;
  box-shadow: 0 4rpx 12rpx rgba(79, 172, 254, 0.3);
  transition: all 0.3s ease;
}

.action-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2rpx 8rpx rgba(79, 172, 254, 0.3);
}

.action-btn text {
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  padding-top: 30rpx;
  border-top: 1px solid #eeeeee;
}

.footer-item {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.footer-text {
  font-size: 14px;
  color: #999999;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.loading-text {
  margin-top: 20rpx;
  font-size: 14px;
  color: #999999;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
}

.empty-text {
  margin-top: 20rpx;
  font-size: 16px;
  color: #666666;
  margin-bottom: 40rpx;
}

.back-btn {
  padding: 16rpx 48rpx;
  background-color: #4facfe;
  border-radius: 50rpx;
}

.back-btn text {
  font-size: 16px;
  color: #ffffff;
}
</style>
