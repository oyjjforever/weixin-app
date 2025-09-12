
<template>
  <view class="container">
    <!-- 顶部导航 -->
    <view class="header">
      <uni-icons type="back" size="24" color="#333"></uni-icons>
      <text class="title">品牌系列</text>
      <view class="header-right">
        <uni-icons type="search" size="24" color="#333"></uni-icons>
        <uni-icons type="notification" size="24" color="#333"></uni-icons>
      </view>
    </view>

    <!-- 轮播图区域 -->
    <view class="swiper-section" v-if="swiperList.length > 0">
      <swiper class="swiper" circular autoplay interval="3000">
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <view class="swiper-item">
            <image :src="item.image" mode="aspectFill"></image>
            <view class="swiper-info">
              <text class="swiper-title">{{ item.title }}</text>
              <text class="swiper-desc">{{ item.description }}</text>
            </view>
            <view class="favorite-btn">
              <uni-icons :type="item.isFavorite ? 'heart-filled' : 'heart'" size="24" color="#ff4757"></uni-icons>
            </view>
          </view>
        </swiper-item>
      </swiper>
    </view>

    <!-- 轮播图空状态 -->
    <view class="swiper-empty" v-else-if="!loading">
      <view class="empty-banner">
        <uni-icons type="image" size="48" color="#d9d9d9"/>
        <text class="empty-banner-text">暂无轮播内容</text>
      </view>
    </view>

    <!-- 热门推荐 -->
    <view class="recommend-section">
      <view class="section-header">
        <text class="section-title">热门推荐</text>
        <text class="see-all" @click="viewCaseList">查看案例</text>
      </view>
      <scroll-view class="product-list" scroll-y>
        <!-- 产品列表 -->
        <view v-for="(item, index) in productList" :key="index" class="product-card" @click="goToDetail(item)">
          <image class="product-image" :src="item.image" mode="aspectFill"></image>
          <view class="product-info">
            <text class="product-name">{{ item.name }}</text>
            <text class="product-desc">{{ item.description }}</text>
            <view class="product-meta">
              <text class="designer">设计师：{{ item.designer }}</text>
              <view class="duration">
                <uni-icons type="calendar" size="14" color="#999"></uni-icons>
                <text>{{ item.duration }}</text>
              </view>
            </view>
            <view class="product-footer">
              <view class="difficulty">
                <text>{{ item.difficulty }}</text>
                <uni-icons type="star" size="14" color="#ff4757"></uni-icons>
              </view>
              <text class="rating">{{ item.rating }}</text>
            </view>
          </view>
          <view class="favorite-icon">
            <uni-icons :type="item.isFavorite ? 'heart-filled' : 'heart'" size="20" color="#ff4757"></uni-icons>
          </view>
        </view>

        <!-- 产品列表空状态 -->
        <view class="product-empty" v-if="productList.length === 0 && !loading">
          <view class="empty-content">
            <uni-icons type="shop" size="64" color="#d9d9d9"/>
            <text class="empty-title">暂无推荐产品</text>
            <text class="empty-desc">当前没有可展示的产品信息</text>
            <view class="empty-action" @click="refreshData">
              <text class="action-text">重新加载</text>
            </view>
          </view>
        </view>

        <!-- 加载状态 -->
        <view class="loading-state" v-if="loading">
          <uni-icons type="spinner-cycle" size="32" color="#999"/>
          <text class="loading-text">加载中...</text>
        </view>
      </scroll-view>
    </view>


  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const swiperList = ref([]);
const productList = ref([]);
const loading = ref(false);

// 获取产品列表数据
const getProductList = async () => {
  loading.value = true;
  try {
    const result = await uniCloud.callFunction({
      name: 'getProductList',
      data: {
        page: 1,
        pageSize: 20
      }
    });
    
    if (result.result.code === 0) {
      const { products, banners } = result.result.data;
      productList.value = products || [];
      swiperList.value = banners || [];
    } else {
      uni.showToast({
        title: result.result.message || '获取数据失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('获取产品列表失败:', error);
    uni.showToast({
      title: '网络错误，请重试',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

// 页面加载时获取数据
onMounted(() => {
  getProductList();
});

// 跳转到产品详情页
const goToDetail = (product: any) => {
  uni.navigateTo({
    url: `/pages/index/detail?id=${product._id || product.id}`
  });
};

// 跳转到案例详情页
const viewCaseDetail = () => {
  uni.navigateTo({
    url: '/pages/case/detail'
  });
};

// 跳转到案例列表页
const viewCaseList = () => {
  uni.navigateTo({
    url: '/pages/case/index'
  });
};

// 刷新数据
const refreshData = () => {
  getProductList();
};
</script>

<style>
page {
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f8f9fa;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  background-color: #fff;
}

.header-right {
  display: flex;
  gap: 30rpx;
}

.title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.swiper-section {
  margin: 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.swiper {
  height: 400rpx;
}

.swiper-item {
  position: relative;
  width: 100%;
  height: 100%;
}

.swiper-item image {
  width: 100%;
  height: 100%;
}

.swiper-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30rpx;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
}

.swiper-title {
  display: block;
  font-size: 16px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 10rpx;
}

.swiper-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

.favorite-btn {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  padding: 10rpx;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}

.recommend-section {
  flex: 1;
  margin: 20rpx;
  background-color: #fff;
  border-radius: 20rpx;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1px solid #eee;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.see-all {
  font-size: 14px;
  color: #ff4757;
}

.product-list {
  height: calc(100% - 100rpx);
  overflow: auto;
}

.product-card {
  display: flex;
  padding: 30rpx;
  border-bottom: 1px solid #eee;
  position: relative;
}

.product-image {
  width: 200rpx;
  height: 200rpx;
  border-radius: 10rpx;
  margin-right: 20rpx;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.product-desc {
  font-size: 14px;
  color: #666;
  margin-bottom: 20rpx;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}

.designer {
  font-size: 14px;
  color: #999;
}

.duration {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 14px;
  color: #999;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.difficulty {
  display: flex;
  align-items: center;
  gap: 10rpx;
  font-size: 14px;
  color: #666;
}

.rating {
  font-size: 14px;
  color: #ff4757;
  font-weight: bold;
}

.favorite-icon {
  position: absolute;
  top: 30rpx;
  right: 30rpx;
}

/* 轮播图空状态 */
.swiper-empty {
  margin: 20rpx;
  border-radius: 20rpx;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.empty-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400rpx;
  background-color: #f8f9fa;
}

.empty-banner-text {
  margin-top: 20rpx;
  font-size: 14px;
  color: #999;
}

/* 产品列表空状态 */
.product-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400rpx;
}

.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx 40rpx;
}

.empty-title {
  font-size: 16px;
  color: #666;
  font-weight: 500;
  margin: 24rpx 0 16rpx;
  text-align: center;
}

.empty-desc {
  font-size: 14px;
  color: #999;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 40rpx;
}

.empty-action {
  padding: 16rpx 32rpx;
  background-color: #f5f5f5;
  border-radius: 8rpx;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}

.empty-action:active {
  background-color: #e8e8e8;
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
  padding: 60rpx 40rpx;
}

.loading-text {
  margin-top: 20rpx;
  font-size: 14px;
  color: #999;
}


</style>

