<template>
  <view class="container">
    <!-- 顶部导航区域 -->
    <!-- <view class="nav-bar">
      <view class="nav-left">
        <uni-icons type="back" size="24" color="#ffffff" @click="goBack"/>
      </view>
      <view class="nav-right">
        <uni-icons type="star" size="24" color="#ffffff" class="nav-icon" @click="toggleFavorite"/>
        <uni-icons type="redo" size="24" color="#ffffff" @click="handleShare"/>
      </view>
    </view> -->

    <!-- 轮播图区域 -->
    <swiper class="swiper" :indicator-dots="true" :autoplay="false" :duration="500" @click="previewImage">
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image :src="item" mode="aspectFill" class="swiper-image"/>
      </swiper-item>
    </swiper>

    <!-- 产品基本信息区域 -->
    <view class="info-section">
      <text class="product-name">{{ productInfo.name }}</text>
      <view class="price-section">
        <text class="price-symbol">¥</text>
        <text class="price-value">{{ productInfo.price }}</text>
      </view>
      <view class="stats-section">
        <text class="sales">月销 {{ productInfo.sales }}</text>
        <view class="rating">
          <uni-icons type="star-filled" size="14" color="#FFB800"/>
          <text class="rating-value">{{ productInfo.rating }}</text>
        </view>
      </view>
      <text class="product-desc">{{ productInfo.description }}</text>
      <view class="designer-info">
        <text class="designer-label">设计师：</text>
        <text class="designer-name">{{ productInfo.designer }}</text>
      </view>
    </view>

    <!-- 产品详细信息区域 -->
    <view class="detail-section">
      <view class="spec-card">
        <view class="card-title">
          <text>产品规格</text>
        </view>
        <view class="spec-item">
          <text class="spec-label">尺寸：</text>
          <text class="spec-value">{{ productInfo.size }}</text>
        </view>
        <view class="spec-item">
          <text class="spec-label">材质：</text>
          <text class="spec-value">{{ productInfo.material }}</text>
        </view>
        <view class="spec-item">
          <text class="spec-label">颜色：</text>
          <text class="spec-value">{{ productInfo.color }}</text>
        </view>
      </view>

      <view class="feature-card">
        <view class="card-title">
          <text>产品特点</text>
        </view>
        <view class="tag-container">
          <text class="tag" v-for="tag in productInfo.features" :key="tag">{{ tag }}</text>
        </view>
      </view>

      <view class="scene-card">
        <view class="card-title">
          <text>适用场景</text>
        </view>
        <text class="scene-desc">{{ productInfo.sceneDesc }}</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 产品信息
const productInfo = ref({});

const swiperList = ref([]);

// 获取产品详情数据
const getProductDetail = async (productId: string) => {
  try {
    const result = await uniCloud.callFunction({
      name: 'getProductDetail',
      data: { id: productId }
    });
    
    if (result.result.code === 0) {
      const product = result.result.data;
      productInfo.value = {
        id: product._id,
        name: product.name,
        image: product.image,
        description: product.description,
        designer: product.designer,
        rating: product.rating,
        price: product.price,
        sales: product.sales,
        size: product.size,
        material: product.material,
        color: product.color,
        features: product.features || [],
        sceneDesc: product.sceneDesc
      };
      
      // 处理产品图片，支持多图轮播
      if (product.image) {
        // 如果是数组，直接使用；如果是字符串，转换为数组
        const images = Array.isArray(product.image) ? product.image : [product.image];
        swiperList.value = images;
      }
    }
  } catch (error) {
    console.error('获取产品详情失败:', error);
  }
};

// 获取页面参数
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;
  
  if (options && options.id) {
    // 如果有产品ID，通过云函数获取详情
    getProductDetail(options.id);
  }
});

const goBack = () => {
  uni.navigateBack();
};

const toggleFavorite = () => {
  uni.showToast({
    title: '收藏成功',
    icon: 'success'
  });
};

const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true
  });
};

const previewImage = () => {
  uni.previewImage({
    urls: swiperList,
    current: swiperList[0]
  });
};
</script>

<style>
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

.nav-left:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.nav-right {
  display: flex;
  gap: 40rpx;
}

.swiper {
  width: 750rpx;
  height: 800rpx;
  flex-shrink: 0;
}

.swiper-image {
  width: 100%;
  height: 100%;
}

.info-section {
  padding: 40rpx 30rpx;
  background-color: #ffffff;
}

.product-name {
  font-size: 36px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20rpx;
}

.price-section {
  display: flex;
  align-items: baseline;
  margin-bottom: 20rpx;
}

.price-symbol {
  font-size: 24px;
  color: #ff4d4f;
  margin-right: 4rpx;
}

.price-value {
  font-size: 40px;
  font-weight: bold;
  color: #ff4d4f;
}

.stats-section {
  display: flex;
  align-items: center;
  margin-bottom: 20rpx;
}

.sales {
  font-size: 14px;
  color: #999999;
  margin-right: 40rpx;
}

.rating {
  display: flex;
  align-items: center;
}

.rating-value {
  font-size: 14px;
  color: #333333;
  margin-left: 8rpx;
}

.product-desc {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 20rpx;
}

.designer-info {
  display: flex;
  align-items: center;
}

.designer-label {
  font-size: 14px;
  color: #999999;
}

.designer-name {
  font-size: 14px;
  color: #333333;
  font-weight: 500;
}

.detail-section {
  padding: 20rpx 30rpx;
}

.spec-card, .feature-card, .scene-card {
  background-color: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 30rpx;
}

.spec-item {
  display: flex;
  margin-bottom: 20rpx;
}

.spec-label {
  font-size: 14px;
  color: #999999;
  width: 120rpx;
}

.spec-value {
  font-size: 14px;
  color: #333333;
  flex: 1;
}

.tag-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20rpx;
}

.tag {
  padding: 12rpx 24rpx;
  background-color: #f5f5f5;
  border-radius: 28rpx;
  font-size: 14px;
  color: #666666;
}

.scene-desc {
  font-size: 14px;
  color: #666666;
  line-height: 1.6;
}
</style>

