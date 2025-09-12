<template>
  <view class="empty-state">
    <view class="empty-icon">
      <image v-if="image" :src="image" mode="aspectFit" class="empty-image" />
      <uni-icons v-else :type="icon" :size="iconSize" :color="iconColor" />
    </view>
    <text class="empty-title" v-if="title">{{ title }}</text>
    <text class="empty-desc" v-if="description">{{ description }}</text>
    <view class="empty-action" v-if="showButton" @click="handleAction">
      <text class="action-text">{{ buttonText }}</text>
    </view>
  </view>
</template>

<script lang="ts" setup>
interface Props {
  icon?: string
  iconSize?: number
  iconColor?: string
  image?: string
  title?: string
  description?: string
  showButton?: boolean
  buttonText?: string
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'info-filled',
  iconSize: 80,
  iconColor: '#d9d9d9',
  title: '暂无数据',
  description: '当前没有相关内容',
  showButton: false,
  buttonText: '重新加载'
})

const emit = defineEmits<{
  action: []
}>()

const handleAction = () => {
  emit('action')
}
</script>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 120rpx 40rpx;
  min-height: 400rpx;
}

.empty-icon {
  margin-bottom: 32rpx;
}

.empty-image {
  width: 160rpx;
  height: 160rpx;
  opacity: 0.6;
}

.empty-title {
  font-size: 16px;
  color: #666;
  font-weight: 500;
  margin-bottom: 16rpx;
  text-align: center;
}

.empty-desc {
  font-size: 14px;
  color: #999;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 40rpx;
  max-width: 400rpx;
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
</style>