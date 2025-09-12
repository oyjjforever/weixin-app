<template>
  <view class="container">
    <!-- 顶部展示区 -->
    <view class="top-section">
      <!-- 大幅案例实景图轮播 -->
      <swiper class="main-swiper" :indicator-dots="true" :autoplay="true" :interval="4000" :duration="500">
        <swiper-item v-for="(item, index) in mainImages" :key="index">
          <image :src="item" mode="aspectFill" class="main-image"/>
        </swiper-item>
      </swiper>
      
      <!-- 悬浮导航栏 -->
      <view class="nav-overlay">
        <view class="nav-left" @click="goBack">
          <uni-icons type="back" size="24" color="#ffffff"/>
        </view>
        <view class="nav-right">
          <view class="nav-btn" @click="toggleFavorite">
            <uni-icons :type="isFavorite ? 'heart-filled' : 'heart'" size="24" color="#ffffff"/>
          </view>
          <view class="nav-btn" @click="handleShare">
            <uni-icons type="redo" size="24" color="#ffffff"/>
          </view>
        </view>
      </view>
      
      <!-- 案例基本信息 -->
      <view class="case-info-overlay">
        <text class="case-title">{{ caseInfo.title }}</text>
        <view class="case-tags">
          <text class="tag">{{ caseInfo.roomType }}</text>
          <text class="tag">{{ caseInfo.area }}</text>
          <text class="tag">{{ caseInfo.style }}</text>
        </view>
      </view>
    </view>

    <!-- 滚动内容区 -->
    <scroll-view class="content-scroll" scroll-y>
      <!-- 案例内容区 -->
      <view class="case-content-section">
        <view class="section-header">
          <text class="section-title">案例详情</text>
        </view>
        
        <!-- 业主简介 -->
        <view class="owner-intro">
          <text class="intro-title">业主简介</text>
          <text class="intro-text">{{ caseInfo.ownerIntro }}</text>
        </view>
        
        <!-- 多角度实景图展示 -->
        <view class="scene-gallery">
          <text class="gallery-title">实景展示</text>
          <scroll-view class="gallery-scroll" scroll-x>
            <view class="gallery-item" v-for="(item, index) in sceneImages" :key="index" @click="previewImage(index)">
              <image :src="item.image" mode="aspectFill" class="gallery-image"/>
              <view class="product-tag" v-if="item.productTag">
                <text>{{ item.productTag }}</text>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>

      <!-- 家具产品列表 -->
      <view class="furniture-section">
        <view class="section-header">
          <text class="section-title">案例家具</text>
        </view>
        
        <view v-for="(category, categoryIndex) in furnitureCategories" :key="categoryIndex" class="category-group">
          <text class="category-title">{{ category.name }}</text>
          <scroll-view class="product-scroll" scroll-x>
            <view class="product-item" v-for="(product, productIndex) in category.products" :key="productIndex">
              <image :src="product.image" mode="aspectFill" class="product-image"/>
              <view class="product-info">
                <text class="product-name">{{ product.name }}</text>
                <text class="product-desc">{{ product.description }}</text>
                <view class="product-price">
                  <text class="price-symbol">¥</text>
                  <text class="price-value">{{ product.price }}</text>
                </view>
                <view class="add-cart-btn" @click="addToCart(product)">
                  <text>加入购物车</text>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>

      <!-- 搭配建议区 -->
      <view class="suggestion-section">
        <view class="section-header">
          <text class="section-title">搭配建议</text>
        </view>
        
        <view class="suggestion-card">
          <text class="card-title">设计师建议</text>
          <view class="suggestion-tags">
            <text class="suggestion-tag" v-for="(tag, index) in designerSuggestions" :key="index">{{ tag }}</text>
          </view>
        </view>
        
        <view class="color-recommendation">
          <text class="card-title">色彩搭配</text>
          <view class="color-palette">
            <view class="color-item" v-for="(color, index) in colorPalette" :key="index" :style="{backgroundColor: color.hex}">
              <text class="color-name">{{ color.name }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 用户评价区 -->
      <view class="review-section">
        <view class="section-header">
          <text class="section-title">用户评价</text>
          <view class="rating-display">
            <uni-icons type="star-filled" size="16" color="#FFB800"/>
            <text class="rating-text">{{ overallRating }}</text>
          </view>
        </view>
        
        <view class="review-item" v-for="(review, index) in userReviews" :key="index">
          <view class="review-header">
            <image :src="review.avatar" class="user-avatar"/>
            <view class="user-info">
              <text class="username">{{ review.username }}</text>
              <view class="review-rating">
                <uni-icons v-for="star in 5" :key="star" 
                  :type="star <= review.rating ? 'star-filled' : 'star'" 
                  size="12" color="#FFB800"/>
              </view>
            </view>
          </view>
          <text class="review-content">{{ review.content }}</text>
          <scroll-view class="review-images" scroll-x v-if="review.images">
            <image v-for="(img, imgIndex) in review.images" :key="imgIndex" 
              :src="img" class="review-image" @click="previewReviewImage(review.images, imgIndex)"/>
          </scroll-view>
        </view>
        
        <view class="more-reviews-btn" @click="viewMoreReviews">
          <text>查看更多评价</text>
        </view>
      </view>

      <!-- 底部互动区 -->
      <view class="interaction-section">
        <view class="action-buttons">
          <view class="action-btn primary" @click="consultDesigner">
            <uni-icons type="chat" size="20" color="#ffffff"/>
            <text>咨询设计师</text>
          </view>
          <view class="action-btn secondary" @click="toggleFavorite">
            <uni-icons :type="isFavorite ? 'heart-filled' : 'heart'" size="20" color="#ff4757"/>
            <text>{{ isFavorite ? '已收藏' : '收藏案例' }}</text>
          </view>
          <view class="action-btn secondary" @click="handleShare">
            <uni-icons type="redo" size="20" color="#666"/>
            <text>分享</text>
          </view>
        </view>
        
        <!-- 相似案例推荐 -->
        <view class="similar-cases">
          <text class="similar-title">相似案例推荐</text>
          <scroll-view class="similar-scroll" scroll-x>
            <view class="similar-item" v-for="(item, index) in similarCases" :key="index" @click="viewSimilarCase(item)">
              <image :src="item.image" mode="aspectFill" class="similar-image"/>
              <text class="similar-name">{{ item.name }}</text>
            </view>
          </scroll-view>
        </view>
      </view>
    </scroll-view>

    <!-- 悬浮式返回顶部按钮 -->
    <view class="back-to-top" v-show="showBackToTop" @click="scrollToTop">
      <uni-icons type="up" size="24" color="#ffffff"/>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

// 页面数据
const isFavorite = ref(false);
const showBackToTop = ref(false);
const loading = ref(false);
const caseId = ref('');

// 案例基本信息
const caseInfo = ref({});

// 主轮播图
const mainImages = ref([]);

// 实景图展示
const sceneImages = ref([]);

// 家具分类
const furnitureCategories = ref([]);

// 设计师建议
const designerSuggestions = ref([]);

// 色彩搭配
const colorPalette = ref([]);

// 用户评价
const overallRating = ref(4.8);
const userReviews = ref([]);

// 相似案例
const similarCases = ref([]);

// 获取案例详情数据
const getCaseDetail = async (id: string) => {
  if (!id) return;
  
  loading.value = true;
  
  try {
    const result = await uniCloud.callFunction({
      name: 'getCaseDetail',
      data: { id }
    });
    
    if (result.result.code === 0) {
      const caseData = result.result.data;
      
      // 更新案例基本信息
      caseInfo.value = {
        title: caseData.title,
        roomType: caseData.roomType,
        area: caseData.area,
        style: caseData.style,
        ownerIntro: caseData.ownerIntro
      };
      
      // 更新轮播图
      if (caseData.mainImages && caseData.mainImages.length > 0) {
        mainImages.value = caseData.mainImages;
      }
      
      // 更新实景图
      if (caseData.sceneImages && caseData.sceneImages.length > 0) {
        sceneImages.value = caseData.sceneImages;
      }
      
      // 更新家具分类
      if (caseData.furnitureCategories && caseData.furnitureCategories.length > 0) {
        furnitureCategories.value = caseData.furnitureCategories;
      }
      
      // 更新设计师建议
      if (caseData.designerSuggestions && caseData.designerSuggestions.length > 0) {
        designerSuggestions.value = caseData.designerSuggestions;
      }
      
      // 更新色彩搭配
      if (caseData.colorPalette && caseData.colorPalette.length > 0) {
        colorPalette.value = caseData.colorPalette;
      }
      
      // 更新用户评价
      if (caseData.overallRating) {
        overallRating.value = caseData.overallRating;
      }
      if (caseData.userReviews && caseData.userReviews.length > 0) {
        userReviews.value = caseData.userReviews;
      }
      
      // 更新相似案例
      if (caseData.similarCases && caseData.similarCases.length > 0) {
        similarCases.value = caseData.similarCases;
      }
      
      // 更新收藏状态
      if (caseData.isFavorite !== undefined) {
        isFavorite.value = caseData.isFavorite;
      }
      
    } else {
      uni.showToast({
        title: result.result.message || '获取案例详情失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('获取案例详情失败:', error);
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

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
  uni.showToast({
    title: isFavorite.value ? '收藏成功' : '取消收藏',
    icon: 'success'
  });
};

const handleShare = () => {
  uni.showShareMenu({
    withShareTicket: true
  });
};

const previewImage = (index: number) => {
  const urls = sceneImages.value.map(item => item.image);
  uni.previewImage({
    urls: urls,
    current: urls[index]
  });
};

const addToCart = (product: any) => {
  uni.showToast({
    title: '已加入购物车',
    icon: 'success'
  });
};

const consultDesigner = () => {
  uni.showToast({
    title: '正在连接设计师',
    icon: 'loading'
  });
};

const viewMoreReviews = () => {
  uni.showToast({
    title: '查看更多评价',
    icon: 'none'
  });
};

const viewSimilarCase = (caseItem: any) => {
  if (caseItem.caseId) {
    uni.navigateTo({
      url: `/pages/case/detail?id=${caseItem.caseId}`
    });
  } else {
    uni.showToast({
      title: `查看${caseItem.name}`,
      icon: 'none'
    });
  }
};

const scrollToTop = () => {
  // 滚动到顶部逻辑
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 300
  });
};

const scrollToSection = (sectionId: string) => {
  uni.showToast({
    title: `跳转到${sectionId}`,
    icon: 'none'
  });
};

const previewReviewImage = (images: string[], index: number) => {
  uni.previewImage({
    urls: images,
    current: images[index]
  });
};

// 页面初始化
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const options = currentPage.options;
  
  if (options && options.id) {
    caseId.value = options.id;
    getCaseDetail(options.id);
  }
});
</script>

<style>
page {
  height: 100%;
  background-color: #f5f5f5;
}

.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* 顶部展示区 */
.top-section {
  position: relative;
  height: 60vh;
  flex-shrink: 0;
}

.main-swiper {
  width: 100%;
  height: 100%;
}

.main-image {
  width: 100%;
  height: 100%;
}

.nav-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 88rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30rpx;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
  z-index: 100;
}

.nav-left, .nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
}

.nav-right {
  display: flex;
  gap: 20rpx;
}

.case-info-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40rpx 30rpx;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
}

.case-title {
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20rpx;
}

.case-tags {
  display: flex;
  gap: 20rpx;
}

.tag {
  padding: 8rpx 16rpx;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20rpx;
  font-size: 12px;
  color: #ffffff;
}

/* 滚动内容区 */
.content-scroll {
  flex: 1;
  background-color: #ffffff;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1px solid #eee;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

/* 案例内容区 */
.case-content-section {
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.owner-intro {
  padding: 30rpx;
}

.intro-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.intro-text {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.scene-gallery {
  padding: 30rpx;
}

.gallery-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.gallery-scroll {
  white-space: nowrap;
}

.gallery-item {
  display: inline-block;
  position: relative;
  width: 300rpx;
  height: 200rpx;
  margin-right: 20rpx;
  border-radius: 10rpx;
  overflow: hidden;
}

.gallery-image {
  width: 100%;
  height: 100%;
}

.product-tag {
  position: absolute;
  bottom: 10rpx;
  right: 10rpx;
  padding: 6rpx 12rpx;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 12rpx;
  font-size: 12px;
  color: #ffffff;
}

/* 家具产品列表 */
.furniture-section {
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.category-group {
  margin-bottom: 40rpx;
}

.category-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding: 0 30rpx 20rpx;
}

.product-scroll {
  white-space: nowrap;
  padding-left: 30rpx;
}

.product-item {
  display: inline-block;
  width: 280rpx;
  margin-right: 20rpx;
  background-color: #f8f9fa;
  border-radius: 10rpx;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 200rpx;
}

.product-info {
  padding: 20rpx;
}

.product-name {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
}

.product-desc {
  font-size: 12px;
  color: #666;
  margin-bottom: 15rpx;
}

.product-price {
  display: flex;
  align-items: baseline;
  margin-bottom: 15rpx;
}

.price-symbol {
  font-size: 12px;
  color: #ff4757;
}

.price-value {
  font-size: 16px;
  font-weight: bold;
  color: #ff4757;
}

.add-cart-btn {
  padding: 12rpx 0;
  background-color: #ff4757;
  border-radius: 6rpx;
  text-align: center;
  font-size: 12px;
  color: #ffffff;
}

/* 搭配建议区 */
.suggestion-section {
  background-color: #ffffff;
  margin-bottom: 20rpx;
  padding: 30rpx;
}

.suggestion-card, .color-recommendation {
  margin-bottom: 30rpx;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.suggestion-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 15rpx;
}

.suggestion-tag {
  padding: 12rpx 24rpx;
  background-color: #f0f0f0;
  border-radius: 20rpx;
  font-size: 12px;
  color: #666;
}

.color-palette {
  display: flex;
  gap: 20rpx;
}

.color-item {
  flex: 1;
  height: 80rpx;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-name {
  font-size: 12px;
  color: #333;
  text-shadow: 0 0 4px rgba(255,255,255,0.8);
}

/* 用户评价区 */
.review-section {
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 10rpx;
}

.rating-text {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.review-item {
  padding: 30rpx;
  border-bottom: 1px solid #eee;
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 15rpx;
}

.user-avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 20rpx;
}

.user-info {
  flex: 1;
}

.username {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5rpx;
}

.review-rating {
  display: flex;
  gap: 5rpx;
}

.review-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15rpx;
}

.review-images {
  white-space: nowrap;
}

.review-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 6rpx;
  margin-right: 15rpx;
}

.more-reviews-btn {
  padding: 30rpx;
  text-align: center;
  font-size: 14px;
  color: #ff4757;
}

/* 底部互动区 */
.interaction-section {
  background-color: #ffffff;
  padding: 30rpx;
}

.action-buttons {
  display: flex;
  gap: 20rpx;
  margin-bottom: 40rpx;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rpx;
  padding: 24rpx;
  border-radius: 12rpx;
  font-size: 14px;
}

.action-btn.primary {
  background-color: #ff4757;
  color: #ffffff;
}

.action-btn.secondary {
  background-color: #f8f9fa;
  color: #666;
  border: 1px solid #eee;
}

.similar-cases {
  margin-top: 30rpx;
}

.similar-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
}

.similar-scroll {
  white-space: nowrap;
}

.similar-item {
  display: inline-block;
  width: 200rpx;
  margin-right: 20rpx;
  text-align: center;
}

.similar-image {
  width: 100%;
  height: 150rpx;
  border-radius: 10rpx;
  margin-bottom: 10rpx;
}

.similar-name {
  font-size: 12px;
  color: #666;
}

/* 悬浮按钮 */
.back-to-top {
  position: fixed;
  bottom: 200rpx;
  right: 30rpx;
  width: 80rpx;
  height: 80rpx;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.quick-nav {
  position: fixed;
  bottom: 100rpx;
  right: 30rpx;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 10rpx;
  padding: 20rpx;
  z-index: 1000;
}

.nav-item {
  padding: 15rpx 20rpx;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.nav-item:last-child {
  border-bottom: none;
}
</style>