
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
    <view class="swiper-section">
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

    <!-- 热门推荐 -->
    <view class="recommend-section">
      <view class="section-header">
        <text class="section-title">热门推荐</text>
        <text class="see-all" @click="viewCaseList">查看案例</text>
      </view>
      <scroll-view class="product-list" scroll-y>
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
      </scroll-view>
    </view>


  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const swiperList = ref([
  {
    image: 'https://ai-public.mastergo.com/ai/img_res/69081bc93ea52c6e4e8320cc48d37102.jpg',
    title: '现代简约客厅',
    description: '打造舒适优雅的生活空间，细节彰显品质',
    isFavorite: true
  },
  {
    image: 'https://ai-public.mastergo.com/ai/img_res/64153c8d255ea1f3bc247cc53467c7fc.jpg',
    title: '精致厨房设计',
    description: '高端定制厨房，让烹饪更有格调',
    isFavorite: false
  }
]);

const productList = ref([
  {
    id: 1,
    image: 'https://ai-public.mastergo.com/ai/img_res/388e0156db63597b1973c1350cd9c481.jpg',
    name: '北欧风卧室套装',
    description: '简约舒适的卧室空间，采用环保材质，打造温馨睡眠环境',
    designer: '张大师',
    duration: '45天',
    difficulty: '中等',
    rating: '4.8',
    isFavorite: true
  },
  {
    id: 2,
    image: 'https://ai-public.mastergo.com/ai/img_res/1e5fec8a19efbdfbefb12ee291ef018b.jpg',
    name: '轻奢浴室组合',
    description: '高品质卫浴空间，细节之处尽显品味',
    designer: '李设计',
    duration: '30天',
    difficulty: '简单',
    rating: '4.9',
    isFavorite: false
  },
  {
    id: 3,
    image: 'https://ai-public.mastergo.com/ai/img_res/8879b790c22c0d5ff7111d49605bb460.jpg',
    name: '现代餐厅系列',
    description: '精选优质材料，打造时尚餐饮空间',
    designer: '王工作室',
    duration: '60天',
    difficulty: '较难',
    rating: '4.7',
    isFavorite: false
  }
]);

// 跳转到产品详情页
const goToDetail = (product: any) => {
  uni.navigateTo({
    url: `/pages/index/detail?id=${product.id}&name=${encodeURIComponent(product.name)}&image=${encodeURIComponent(product.image)}&description=${encodeURIComponent(product.description)}&designer=${encodeURIComponent(product.designer)}&rating=${product.rating}`
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


</style>

