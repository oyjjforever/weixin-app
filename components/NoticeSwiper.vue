<template>
  <view class="notice-swiper-container" v-if="noticeList.length > 0">
    <view class="notice-swiper">
      <swiper
        class="swiper"
        :autoplay="autoplay"
        :interval="interval"
        :circular="true"
        :vertical="vertical"
        :indicator-dots="false"
        @change="onSwiperChange"
      >
        <swiper-item v-for="(item, index) in noticeList" :key="item._id || index">
          <view
            class="swiper-item"
            :class="'type-' + item.type"
            @click="handleClick(item)"
          >
            <view class="notice-icon">
              <uni-icons
                :type="getIconType(item.type)"
                size="20"
                color="#ffffff"
              ></uni-icons>
            </view>
            <view class="notice-content">
              <text class="notice-title">{{ item.title }}</text>
              <text class="notice-desc">{{ getShortContent(item.content) }}</text>
            </view>
            <view class="notice-arrow">
              <uni-icons type="right" size="18" color="#ffffff"></uni-icons>
            </view>
          </view>
        </swiper-item>
      </swiper>
      
      <!-- 指示器 -->
      <view class="indicator-dots" v-if="noticeList.length > 1">
        <view
          v-for="(item, index) in noticeList"
          :key="index"
          class="indicator-dot"
          :class="{ active: currentIndex === index }"
        ></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

// Props定义
interface NoticeItem {
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
}

const props = withDefaults(defineProps<{
  noticeList: NoticeItem[];
  autoplay?: boolean;
  interval?: number;
  vertical?: boolean;
}>(), {
  noticeList: () => [],
  autoplay: true,
  interval: 3000,
  vertical: false
});

// Emits定义
const emit = defineEmits<{
  click: [notice: NoticeItem];
}>();

const currentIndex = ref(0);

// 根据通知类型获取图标
const getIconType = (type: string) => {
  const iconMap: Record<string, string> = {
    promotion: 'gift',
    announcement: 'notification',
    maintenance: 'gear'
  };
  return iconMap[type] || 'notification';
};

// 获取简短内容描述
const getShortContent = (content: string) => {
  if (!content) return '';
  return content.length > 30 ? content.substring(0, 30) + '...' : content;
};

// 轮播切换事件
const onSwiperChange = (e: any) => {
  currentIndex.value = e.detail.current;
};

// 点击事件处理
const handleClick = (item: NoticeItem) => {
  emit('click', item);
};
</script>

<style scoped>
.notice-swiper-container {
  width: 100%;
  background-color: #fff;
}

.notice-swiper {
  position: relative;
  width: 100%;
  height: 90rpx;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-item {
  display: flex;
  align-items: center;
  padding: 0 20rpx;
  height: 100%;
  cursor: pointer;
}

/* 促销活动样式 */
.type-promotion {
  background: linear-gradient(90deg, #ff6b6b 0%, #ff8e53 100%);
}

/* 公告样式 */
.type-announcement {
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
}

/* 维护通知样式 */
.type-maintenance {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
}

.notice-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50rpx;
  height: 50rpx;
  margin-right: 16rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  flex-shrink: 0;
}

.notice-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.notice-title {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 4rpx;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notice-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notice-arrow {
  display: flex;
  align-items: center;
  margin-left: 16rpx;
  flex-shrink: 0;
}

.indicator-dots {
  position: absolute;
  right: 20rpx;
  bottom: 10rpx;
  display: flex;
  gap: 8rpx;
}

.indicator-dot {
  width: 8rpx;
  height: 8rpx;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  width: 20rpx;
  background-color: #ffffff;
  border-radius: 4rpx;
}
</style>
