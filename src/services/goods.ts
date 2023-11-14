import type { GoodsResult } from '@/types/goods'
import { http } from '@/utils/http'

enum API {
  GETGOODSBYIDAPI = '/goods',
}

/**
 * 商品详情
 * @param id 商品id
 */
export const getGoodsByIdAPI = (id: string) => {
  return http<GoodsResult>({
    method: 'GET',
    url: API.GETGOODSBYIDAPI,
    data: { id },
  })
}
