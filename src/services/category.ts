import type { CategoryTopItem } from '@/types/category'
import { http } from '@/utils/http'

// 定义分类接口
enum API {
  GETCATEGORYLIST = '/category/top',
}

/**
 * 分类列表-小程序
 */

export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: API.GETCATEGORYLIST,
  })
}
