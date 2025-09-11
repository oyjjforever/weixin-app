
<template>
  <view class="contact-container">
    <view class="contact-title">联系我们</view>
    
    <view class="contact-card" @click="handleNavigate">
      <view class="card-content">
        <view class="card-left">
          <uni-icons class="card-icon" type="location" size="24" color="#3498db"/>
          <view class="info-content">
            <text class="info-label">店铺地址</text>
            <text class="info-detail">上海市浦东新区陆家嘴环路1000号</text>
          </view>
        </view>
        <uni-icons class="arrow-icon" type="right" size="16" color="#999"/>
      </view>
    </view>

    <view class="contact-card" @click="handleCall">
      <view class="card-content">
        <view class="card-left">
          <uni-icons class="card-icon" type="phone" size="24" color="#3498db"/>
          <view class="info-content">
            <text class="info-label">联系电话</text>
            <text class="info-detail">021-88888888</text>
          </view>
        </view>
        <uni-icons class="arrow-icon" type="right" size="16" color="#999"/>
      </view>
    </view>

    <view class="contact-card">
      <view class="card-content">
        <view class="card-left">
          <uni-icons class="card-icon" type="calendar" size="24" color="#3498db"/>
          <view class="info-content">
            <text class="info-label">营业时间</text>
            <text class="info-detail">周一至周日 10:00-22:00</text>
          </view>
        </view>
      </view>
    </view>

    <view class="store-image">
      <image class="store-photo" mode="aspectFill" src="https://ai-public.mastergo.com/ai/img_res/0b4c21ab73dfd51fe07eff6244863921.jpg" />
    </view>
  </view>
</template>

<script lang="ts" setup>
const handleNavigate = () => {
  uni.openLocation({
    latitude: 31.234527,
    longitude: 121.501608,
    name: '示例店铺',
    address: '上海市浦东新区陆家嘴环路1000号',
    success: () => {
      console.log('导航成功')
    },
    fail: () => {
      uni.showToast({
        title: '打开导航失败',
        icon: 'none'
      })
    }
  })
}

const handleCall = () => {
  uni.makePhoneCall({
    phoneNumber: '021-88888888',
    success: () => {
      console.log('拨打电话成功')
    },
    fail: () => {
      uni.showToast({
        title: '拨打电话失败',
        icon: 'none'
      })
    }
  })
}
</script>

<style>
page {
  height: 100%;
  background-color: #f5f5f5;
}

.contact-container {
  padding: 30rpx;
}

.contact-title {
  font-size: 36px;
  font-weight: bold;
  color: #333;
  margin-bottom: 40rpx;
}

.contact-card {
  background-color: #fff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-left {
  display: flex;
  align-items: center;
  flex: 1;
}

.card-icon {
  width: 24px;
  height: 24px;
  margin-right: 20rpx;
  flex-shrink: 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.info-label {
  font-size: 14px;
  color: #666;
  margin-bottom: 8rpx;
}

.info-detail {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.store-image {
  margin-top: 40rpx;
  border-radius: 16rpx;
  overflow: hidden;
}

.store-photo {
  width: 686rpx;
  height: 400rpx;
  display: block;
}
</style>

