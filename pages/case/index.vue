<template>
  <view class="container">
    <!-- 顶部导航 -->
    <view class="header">
      <view class="nav-left" @click="goBack">
        <uni-icons type="back" size="24" color="#333"/>
      </view>
      <text class="title">家具案例</text>
      <view class="nav-right">
        <uni-icons type="search" size="24" color="#333"/>
      </view>
    </view>

    <!-- 筛选栏 -->
    <view class="filter-bar">
      <scroll-view class="filter-scroll" scroll-x>
        <view class="filter-item" 
          v-for="(item, index) in filterOptions" 
          :key="index"
          :class="{ active: selectedFilter === item.value }"
          @click="selectFilter(item.value)">
          <text>{{ item.label }}</text>
        </view>
      </scroll-view>
    </view>

    <!-- 案例列表 -->
    <scroll-view class="case-list" scroll-y @scrolltolower="loadMore">
      <view class="case-item" 
        v-for="(item, index) in caseList" 
        :key="index"
        @click="viewDetail(item)">
        
        <!-- 案例图片 -->
        <view class="image-container">
          <image 
            :src="item.image" 
            mode="aspectFill" 
            class="case-image"
            :lazy-load="true"/>
          <view class="image-overlay">
            <view class="room-type">{{ item.roomType }}</view>
          </view>
        </view>

        <!-- 案例信息 -->
        <view class="case-info">
          <text class="case-title">{{ item.title }}</text>
          <text class="case-desc">{{ item.description }}</text>
          
          <view class="case-meta">
            <view class="meta-item">
              <uni-icons type="home" size="14" color="#999"/>
              <text>{{ item.area }}</text>
            </view>
            <view class="meta-item">
              <uni-icons type="person" size="14" color="#999"/>
              <text>{{ item.designer }}</text>
            </view>
          </view>

          <view class="case-footer">
            <view class="price-section">
              <text class="price-label">套餐价格</text>
              <view class="price-container">
                <text class="price-symbol">¥</text>
                <text class="price-value">{{ item.price }}</text>
              </view>
            </view>
            
            <view class="detail-btn" @click.stop="viewDetail(item)">
              <text>查看详情</text>
              <uni-icons type="right" size="14" color="#666"/>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载更多 -->
      <view class="load-more" v-if="hasMore">
        <text>加载更多...</text>
      </view>
      
      <!-- 没有更多数据 -->
      <view class="no-more" v-else-if="caseList.length > 0">
        <text>没有更多案例了</text>
      </view>

      <!-- 空状态 -->
      <view class="empty-state" v-if="caseList.length === 0 && !loading">
        <uni-icons type="info" size="48" color="#ccc"/>
        <text class="empty-text">暂无案例数据</text>
      </view>
    </scroll-view>

    <!-- 返回顶部按钮 -->
    <view class="back-to-top" v-show="showBackToTop" @click="scrollToTop">
      <uni-icons type="up" size="24" color="#ffffff"/>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 页面状态
const loading = ref(false);
const hasMore = ref(true);
const showBackToTop = ref(false);
const selectedFilter = ref('all');

// 筛选选项
const filterOptions = ref([
  { label: '全部', value: 'all' },
  { label: '现代简约', value: 'modern' },
  { label: '北欧风格', value: 'nordic' },
  { label: '中式风格', value: 'chinese' },
  { label: '美式风格', value: 'american' },
  { label: '欧式风格', value: 'european' }
]);

// 案例列表数据
const caseList = ref([
  {
    id: 1,
    title: '现代简约三居室设计',
    description: '采用简约现代的设计理念，以白色和木色为主调，营造温馨舒适的居住环境',
    image: 'https://ai-public.mastergo.com/ai/img_res/69081bc93ea52c6e4e8320cc48d37102.jpg',
    price: '28999',
    area: '120㎡',
    roomType: '三居室',
    designer: '张设计师',
    style: 'modern'
  },
  {
    id: 2,
    title: '北欧风格两居室',
    description: '清新自然的北欧风格，注重功能性与美观性的完美结合',
    image: 'https://ai-public.mastergo.com/ai/img_res/64153c8d255ea1f3bc247cc53467c7fc.jpg',
    price: '22999',
    area: '85㎡',
    roomType: '两居室',
    designer: '李设计师',
    style: 'nordic'
  },
  {
    id: 3,
    title: '轻奢美式四居室',
    description: '融合现代与传统的美式风格，展现优雅与舒适的生活品味',
    image: 'https://ai-public.mastergo.com/ai/img_res/388e0156db63597b1973c1350cd9c481.jpg',
    price: '45999',
    area: '150㎡',
    roomType: '四居室',
    designer: '王设计师',
    style: 'american'
  },
  {
    id: 4,
    title: '新中式风格别墅',
    description: '传统文化与现代生活的完美融合，彰显东方美学魅力',
    image: 'https://ai-public.mastergo.com/ai/img_res/1e5fec8a19efbdfbefb12ee291ef018b.jpg',
    price: '68999',
    area: '200㎡',
    roomType: '别墅',
    designer: '陈设计师',
    style: 'chinese'
  },
  {
    id: 5,
    title: '欧式古典大宅',
    description: '奢华典雅的欧式风格，每一处细节都体现贵族气质',
    image: 'https://ai-public.mastergo.com/ai/img_res/8879b790c22c0d5ff7111d49605bb460.jpg',
    price: '89999',
    area: '280㎡',
    roomType: '大宅',
    designer: '刘设计师',
    style: 'european'
  },
  {
    id: 6,
    title: '工业风格loft',
    description: '粗犷与精致并存的工业风格，展现个性化的生活态度',
    image: 'https://ai-public.mastergo.com/ai/img_res/1c1e7a581bc7d9c42ef0bb607f629998.jpg',
    price: '35999',
    area: '110㎡',
    roomType: 'Loft',
    designer: '赵设计师',
    style: 'industrial'
  }
]);

// 方法定义
const goBack = () => {
  uni.navigateBack();
};

const selectFilter = (value: string) => {
  selectedFilter.value = value;
  // 这里可以添加筛选逻辑
  uni.showToast({
    title: `筛选：${filterOptions.value.find(item => item.value === value)?.label}`,
    icon: 'none'
  });
};

const viewDetail = (caseItem: any) => {
  uni.navigateTo({
    url: `/pages/case/detail?id=${caseItem.id}&title=${encodeURIComponent(caseItem.title)}`
  });
};

const loadMore = () => {
  if (loading.value || !hasMore.value) return;
  
  loading.value = true;
  // 模拟加载更多数据
  setTimeout(() => {
    // 这里可以添加更多数据
    loading.value = false;
    hasMore.value = false; // 模拟没有更多数据
  }, 1000);
};

const scrollToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  });
};

// 监听页面滚动
const onPageScroll = (e: any) => {
  showBackToTop.value = e.scrollTop > 500;
};

onMounted(() => {
  // 页面加载完成后的初始化操作
});
</script>

<style>
page {
  height: 100%;
  background-color: #F8F8F8;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F8F8F8;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
}

/* 顶部导航 */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
}

.nav-left, .nav-right {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333333;
}

/* 筛选栏 */
.filter-bar {
  background-color: #ffffff;
  padding: 20rpx 0;
  border-bottom: 1px solid #f0f0f0;
}

.filter-scroll {
  white-space: nowrap;
  padding: 0 30rpx;
}

.filter-item {
  display: inline-block;
  padding: 12rpx 24rpx;
  margin-right: 20rpx;
  background-color: #f5f5f5;
  border-radius: 20rpx;
  font-size: 14px;
  color: #666666;
  transition: all 0.3s ease;
}

.filter-item.active {
  background-color: #B87D4B;
  color: #ffffff;
}

/* 案例列表 */
.case-list {
  flex: 1;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
}

.case-item {
  background-color: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 30rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

.case-item:active {
  transform: translateY(2rpx);
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.12);
}

/* 图片容器 */
.image-container {
  position: relative;
  width: 100%;
  height: 400rpx;
  overflow: hidden;
}

.case-image {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
}

.room-type {
  padding: 8rpx 16rpx;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 12rpx;
  font-size: 12px;
  color: #ffffff;
}

/* 案例信息 */
.case-info {
  padding: 32rpx;
  width: 100%;
  box-sizing: border-box;
}

.case-title {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 16rpx;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.case-desc {
  display: block;
  font-size: 14px;
  color: #666666;
  line-height: 1.5;
  margin-bottom: 24rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.case-meta {
  display: flex;
  align-items: center;
  margin-bottom: 24rpx;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-right: 40rpx;
  font-size: 12px;
  color: #999999;
}

.meta-item text {
  margin-left: 8rpx;
}

.case-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}

.price-section {
  flex: 1;
  min-width: 0;
  margin-right: 20rpx;
}

.price-label {
  display: block;
  font-size: 12px;
  color: #999999;
  margin-bottom: 8rpx;
}

.price-container {
  display: flex;
  align-items: baseline;
}

.price-symbol {
  font-size: 16px;
  color: #B87D4B;
  font-weight: bold;
  margin-right: 4rpx;
}

.price-value {
  font-size: 20px;
  color: #B87D4B;
  font-weight: bold;
}

.detail-btn {
  display: flex;
  align-items: center;
  padding: 16rpx 24rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  font-size: 14px;
  color: #666666;
  transition: all 0.3s ease;
  flex-shrink: 0;
  white-space: nowrap;
}

.detail-btn:active {
  background-color: #e8e8e8;
}

.detail-btn text {
  margin-right: 8rpx;
}

/* 加载状态 */
.load-more, .no-more {
  padding: 40rpx;
  text-align: center;
  font-size: 14px;
  color: #999999;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
}

.empty-text {
  margin-top: 20rpx;
  font-size: 14px;
  color: #999999;
}

/* 返回顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 100rpx;
  right: 30rpx;
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.2);
}

/* 动画效果 */
.case-item {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media screen and (min-width: 768px) {
  .case-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30rpx;
  }
  
  .case-item {
    margin-bottom: 0;
  }
}

@media screen and (min-width: 1024px) {
  .case-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>