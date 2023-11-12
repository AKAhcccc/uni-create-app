// 引入数据类型
import type { BannerItem, CategoryItem, HotItem, GuessItem } from '@/types/home'
import type { PageParams, PageResult } from '@/types/global'
import { http } from '@/utils/http'
// 定义接口
enum API {
  GETHOMEBANNER = '/home/banner',
  GETHOMECATEGORY = '/home/category/mutli',
  GETHOMEHOT = '/home/hot/mutli',
  GETHOMEGOODSGUESSLIKE = '/home/goods/guessLike',
}
/**
 * 首页-广告区域-小程序
 * @param distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: API.GETHOMEBANNER,
    data: {
      distributionSite,
    },
  })
}

/**
 * 首页-前台分类-小程序
 */
export const getHomeCategoryAPI = () => {
  return http<CategoryItem[]>({
    method: 'GET',
    url: API.GETHOMECATEGORY,
  })
}

/**
 * 首页-热门推荐-小程序
 */
export const getHomeHotAPI = () => {
  return http<HotItem[]>({
    method: 'GET',
    url: API.GETHOMEHOT,
  })
}

/**
 * 首页-猜你喜欢-小程序
 */
export const getHomeGoodsGuessLikeAPI = (data?: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: API.GETHOMEGOODSGUESSLIKE,
    data,
  })
}
