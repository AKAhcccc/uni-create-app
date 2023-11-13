import type { PageParams } from '@/types/global'
import type { HotResult } from '@/types/hot'
import { http } from '@/utils/http'

// 定义接口
enum API {}

/**
 * 通用热门推荐类型
 * @param url 请求地址
 * @param data 请求参数
 */

export const getHotRecommendAPI = (url: string, data?: PageParams & { subType?: string }) => {
  return http<HotResult>({
    method: 'GET',
    url,
    data,
  })
}
