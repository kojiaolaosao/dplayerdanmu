import Vue from 'vue'
import App from './App.vue'
import VueAMap from 'vue-amap'


Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  // key: 'dd4cc5f831b67cde767de9a65f983650',
  key: '4c6c906feaedd18afd1a5f12f9fbbc26',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar',
    'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion:'1.0.11'
})


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
