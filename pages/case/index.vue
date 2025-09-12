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
        <view class="empty-content">
          <uni-icons type="home" size="80" color="#d9d9d9"/>
          <text class="empty-title">暂无案例数据</text>
          <text class="empty-desc">当前筛选条件下没有找到相关案例</text>
          <view class="empty-actions">
            <view class="empty-action" @click="resetFilter">
              <text class="action-text">重置筛选</text>
            </view>
            <view class="empty-action primary" @click="refreshCases">
              <text class="action-text">刷新数据</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-state" v-if="loading && caseList.length === 0">
        <uni-icons type="spinner-cycle" size="40" color="#999"/>
        <text class="loading-text">正在加载案例...</text>
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
const currentPage = ref(1);
const pageSize = ref(10);

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
const caseList = ref([]);

// 获取案例列表数据
const getCaseList = async (isRefresh = false) => {
  if (loading.value) return;
  
  loading.value = true;
  
  try {
    const result = await uniCloud.callFunction({
      name: 'getCaseList',
      data: {
        page: isRefresh ? 1 : currentPage.value,
        pageSize: pageSize.value,
        style: selectedFilter.value
      }
    });
    
    if (result.result.code === 0) {
      const { cases, hasMore: more } = result.result.data;
      
      if (isRefresh) {
        caseList.value = cases || [];
        currentPage.value = 1;
      } else {
        caseList.value = [...caseList.value, ...(cases || [])];
      }
      
      hasMore.value = more;
      currentPage.value++;
    } else {
      uni.showToast({
        title: result.result.message || '获取案例列表失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('获取案例列表失败:', error);
    uni.showToast({
      title: '网络错误，请重试',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

// 方法定义
const goBack = () => {
  uni.navigateBack();
};

const selectFilter = (value: string) => {
  selectedFilter.value = value;
  currentPage.value = 1;
  getCaseList(true); // 重新获取数据
};

const viewDetail = (caseItem: any) => {
  uni.navigateTo({
    url: `/pages/case/detail?id=${caseItem._id || caseItem.id}`
  });
};

const loadMore = () => {
  if (loading.value || !hasMore.value) return;
  getCaseList(false);
};

const scrollToTop = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  });
};

// 重置筛选条件
const resetFilter = () => {
  selectedFilter.value = 'all';
  currentPage.value = 1;
  getCaseList(true);
};

// 刷新案例数据
const refreshCases = () => {
  currentPage.value = 1;
  getCaseList(true);
};

// 监听页面滚动
const onPageScroll = (e: any) => {
  showBackToTop.value = e.scrollTop > 500;
};

onMounted(() => {
  getCaseList(true);
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
  overflow: auto;
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
  align-items: center;
  justify-content: center;
  min-height: 500rpx;
  padding: 60rpx 40rpx;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-title {
  font-size: 18px;
  color: #666;
  font-weight: 500;
  margin: 32rpx 0 16rpx;
}

.empty-desc {
  font-size: 14px;
  color: #999;
  line-height: 1.5;
  margin-bottom: 48rpx;
  max-width: 400rpx;
}

.empty-actions {
  display: flex;
  gap: 20rpx;
}

.empty-action {
  padding: 16rpx 24rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.empty-action.primary {
  background-color: #B87D4B;
  border-color: #B87D4B;
}

.empty-action.primary .action-text {
  color: #fff;
}

.empty-action:active {
  transform: scale(0.98);
}

.action-text {
  font-size: 14px;
  color: #666;
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
}

.loading-text {
  margin-top: 24rpx;
  font-size: 14px;
  color: #999;
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