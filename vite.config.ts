import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import pxtovw from 'postcss-px-to-viewport-8-plugin'

const vant_pxtovw = pxtovw({
  unitToConvert: 'px',// 需要转换的单位，默认为"px"
  viewportWidth: 375,// 设计稿的视口宽度
  viewportUnit: 'vw', // 希望使用的视口单位
  exclude: [/node_modules\/vant/i], //忽略vant的
  unitPrecision: 6, // 转换后的精度，即小数点位数
  propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
  fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
  selectorBlackList: [], // 指定不转换为视窗单位的类名，
  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
  replace: true, // 是否转换后直接更换属性值
  landscape: false // 是否处理横屏情况
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss:{
      plugins:[vant_pxtovw]
    },
    preprocessorOptions: {
      less: {
        math: 'always',
        additionalData: `@import "@/assets/style/global.less";`
      }
    }
  }
})
