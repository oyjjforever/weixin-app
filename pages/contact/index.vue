
<template>
  <view class="contact-container">
    <view class="contact-title">联系我们</view>
    
    <view class="contact-card" @click="handleNavigate">
      <view class="card-content">
        <view class="card-left">
          <uni-icons class="card-icon" type="location" size="24" color="#3498db"/>
          <view class="info-content">
            <text class="info-label">店铺地址</text>
            <text class="info-detail">福州市晋安区福兴大道5号茶花现代家居建材广场二楼C36丽祥家居</text>
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
            <text class="info-detail">17759186806</text>
          </view>
        </view>
        <uni-icons class="arrow-icon" type="right" size="16" color="#999"/>
      </view>
    </view>

    <view class="contact-card" @click="handleWechat">
      <view class="card-content">
        <view class="card-left">
          <uni-icons class="card-icon" type="chat" size="24" color="#3498db"/>
          <view class="info-content">
            <text class="info-label">联系微信</text>
            <text class="info-detail">点击添加微信好友</text>
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
            <text class="info-detail">周一至周日 9:00-18:00</text>
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
    name: '丽祥家居',
    address: '福州市晋安区福兴大道5号茶花现代家居建材广场二楼C36丽祥家居',
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
    phoneNumber: '17759186806',
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

const handleWechat = () => {
  // 显示操作选择弹窗
  uni.showActionSheet({
    itemList: ['复制微信号', '保存二维码', '查看联系方式'],
    success: (res) => {
      switch (res.tapIndex) {
        case 0:
          // 复制微信号
          uni.setClipboardData({
            data: 'LXJJ193', // 替换为实际的微信号
            success: () => {
              uni.showModal({
                title: '微信号已复制',
                content: '请打开微信，点击右上角"+"号，选择"添加朋友"，粘贴微信号即可添加',
                showCancel: false,
                confirmText: '知道了'
              })
            }
          })
          break
        case 1:
          // 保存二维码（这里可以显示二维码图片）
          uni.showModal({
            title: '微信二维码',
            content: '长按保存二维码图片，在微信中扫码添加好友',
            showCancel: false,
            confirmText: '知道了'
          })
          break
        case 2:
          // 显示详细联系方式
          uni.showModal({
            title: '联系方式',
            content: '微信号：LXJJ193，电话：17759186806，地址：福州市晋安区福兴大道5号茶花现代家居建材广场二楼C36丽祥家居',
            showCancel: false,
            confirmText: '知道了'
          })
          break
      }
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

