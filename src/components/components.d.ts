import XtxSwiper from './XtxSwiper.vue'
// 生命组件
declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
  }
}
