<script setup lang="ts">
import { ref } from 'vue'
// 引入获取轮播数据接口
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
// 引入Navbar组件
import CustomNavbar from './components/CustomNavbar.vue'
// 引入分类组件
import CategoryPanel from './components/CategoryPanel.vue'
// 引入热门推荐组件
import HotPanel from '@/pages/index/components/HotPanel.vue'
// 引入页面生命周期
import { onLoad } from '@dcloudio/uni-app'
// 引入数据类型
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import type { XtxGuessInstance } from '@/components/components'
import PageSkeleton from './components/PageSkeleton.vue'

// 接受轮播图数据
const bannerList = ref<BannerItem[]>([])
// 获取轮播图数据
const getHomeBannerDate = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}
// 接收前台分类数据
const categoryList = ref<CategoryItem[]>([])
// 获取前台分类数据
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}
// 接收热门推荐数据
const HotPanelList = ref<HotItem[]>([])
// 获取热门推荐数据
const getHomeHot = async () => {
  const res = await getHomeHotAPI()
  HotPanelList.value = res.result
}
// 页面声明周期，页面初始化加载时触发
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerDate(), getHomeCategoryData(), getHomeHot()])

  isLoading.value = false
})
// 是否加载中
const isLoading = ref(false)
// 获取猜你喜欢组件实例
const guessRef = ref<XtxGuessInstance>()
// 下拉刷新状态
const isTriggered = ref(false)
// 滚动触底
const onScrolltolower = () => {
  console.log('滚动触底')
  guessRef.value?.getMore()
}
// 自定义下拉刷新被触发
const onRefresherrefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 重置猜你喜欢数据
  guessRef.value?.resetData()
  // 加载数据
  await Promise.all([
    getHomeBannerDate(),
    getHomeCategoryData(),
    getHomeHot(),
    guessRef.value?.getMore(),
  ])
  // 关闭动画
  isTriggered.value = false
}
</script>

<template>
  <!-- 自定义导航组件 -->
  <CustomNavbar />
  <scroll-view
    refresher-enabled
    :refresher-triggered="isTriggered"
    @refresherrefresh="onRefresherrefresh"
    @scrolltolower="onScrolltolower"
    class="scroll-view"
    scroll-y
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!-- 轮播图组件 -->
      <XtxSwiper :list="bannerList" />
      <!-- 分类组件 -->
      <CategoryPanel :list="categoryList" />
      <!-- 热门推荐组件 -->
      <HotPanel :list="HotPanelList" />
      <!-- 猜你喜欢模块 -->
      <XtxGuess ref="guessRef" />
    </template>
    <!-- 滚动容器 -->
  </scroll-view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;

  .scroll-view {
    flex: 1;
  }
}
</style>
