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
onLoad(() => {
  getHomeBannerDate()
  getHomeCategoryData()
  getHomeHot()
})
</script>

<template>
  <!-- 自定义导航组件 -->
  <CustomNavbar />
  <!-- 轮播图组件 -->
  <XtxSwiper :list="bannerList" />
  <!-- 分类组件 -->
  <CategoryPanel :list="categoryList" />
  <!-- 热门推荐组件 -->
  <HotPanel :list="HotPanelList" />
  <view class="index">index</view>
</template>

<style lang="scss">
page {
  background-color: #f7f7f7;
}
</style>
