<template>
  <div>
    <div id="dp" style="width: 885px;height: 500px"></div>
    <!-- 地图容器 -->
    <div id="map_container" style="width: 800px;height: 700px;float: right;margin-top:-500px;right: 50px">
      <!-- 地图 -->
      <el-amap :center="center" :zoom="zoom" class="amap_demo" :plugin="plugin">
        <!-- 地图标记 -->
        <el-amap-marker v-for="(marker,index) in markers" :position="marker.position" :key="index"></el-amap-marker>
      </el-amap>
    </div>
  </div>


</template>

<script>
// import DPlayer from '../../node_modules/dplayer'
import DPlayer from 'dplayer'
import AMap from "postcss";
// const dp = new DPlayer(options);


export default {
  data() {
    const that = this;
    return {
      dp: null,
      zoom: 16,
      // 默认中心点
      // center: [121.59996, 31.197646],
      // 标记点
      markers: [
        // 标记点位置
        // {position: [121.59996, 31.197646],}
      ],
      // 当前地图的插件
      plugin: [{
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true,        //显示定位按钮，默认：true
        buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
        showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
        extensions: 'all',
        pName: 'Geolocation',
        events: {
          init(o) {
            // o 是高德地图定位插件实例
            o.getCurrentPosition((status, result) => {
              console.log(result)
              if (result && result.position) {
                // 将当前经纬度给中心点
                that.center = [result.position.lng, result.position.lat];
                // 将当前经纬度给标记点
                that.markers[0].position = that.center;
                that.loaded = true;
                that.$nextTick();
              }
            });
          }
        }
      }],

    }
  },
  methods: {
    onplay() {
      this.onplay();
    },
    // methods部分
    getLocation() {
      const self = this;
      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
        })

        geolocation.getCurrentPosition()
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log('定位成功信息：', data);
        }

        function onError(data) {
          // 定位出错
          console.log('定位失败错误：', data);
          // 调用ip定位
          self.getLngLatLocation();
        }
      })
    },
    getLngLatLocation() {
      AMap.plugin('AMap.CitySearch', function () {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // 查询成功，result即为当前所在城市信息
            console.log('通过ip获取当前城市：', result)
            //逆向地理编码
            AMap.plugin('AMap.Geocoder', function () {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              })

              var lnglat = result.rectangle.split(';')[0].split(',');
              geocoder.getAddress(lnglat, function (status, data) {
                if (status === 'complete' && data.info === 'OK') {
                  // result为对应的地理位置详细信息
                  console.log(data)
                }
              })
            })
          }
        })
      })
    },
  },
// created 中调用
  created() {
    // 此处为调用精确定位之后，调取ip定位，可根据实际情况改写
    this.getLocation();
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    let dp = new DPlayer({
      container: document.getElementById('dp'),
      mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
      theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
      loop: false, // 是否自动循环
      lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
      screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
      hotkey: true, // 是否支持热键，调节音量，播放，暂停等
      preload: "auto", // 自动预加载
      volume: 0.7, // 初始化音量
      playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
      logo: "https://qczh-1252727916.cos.ap-nanjing.myqcloud.com/pic/273658f508d04d488414fd2b84c9f923.png", // 在视频左角上打一个logo
      video: {
        url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        type: 'auto',
        quality: [
          // 设置多个质量的视频
          {
            name: "高清",
            url: "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
            type: "auto", // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
          },
          {
            name: "标清",
            url:
                "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
            type: "auto",
          },
        ],
        defaultQuality: 0, // 默认是高清
        // 视频封面图片
        pic: "http://kjls.gitee.io/vuemusicplayer/images/bg.jpg",
        // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
        // thumbnails: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606462956126&di=2d87964d4faf656af55d09d938640d97&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201310%2F10%2F150326y7dzdd8d4kpjjdsd.jpg",
        thumbnails: "http://kjls.gitee.io/vuemusicplayer/images/bg.jpg"

      },
      danmaku: {
        // 弹幕
        id: "9E2E3368B56CDBB4",
        api: "https://dplayer.moerats.com/",
        // token: "tokendemo", //后端验证令牌
        maximum: 1000, //弹幕最大数量
        // addition: ["https://dplayer.moerats.com/v3/bilibili?aid=170001"], //其他弹幕
        // user: "DIYgod", //弹幕用户名
        // bottom: "15%", //值，例如：10px，10％，即弹幕底部和播放器底部之间的距离，以防止遮挡字幕
        unlimited: true, //即使弹幕重叠也显示所有弹幕
      },
      // subtitle: {   //字幕
      //   url: "",   //字幕网址
      //   color:'#fff' 字幕颜色
      //   fontSize: "20px",
      //   bottom: "40px",
      // },
      contextmenu: [
        //  自定义上下文菜单
        // 右键菜单
        {
          text: "custom1",
          link: "https://www.bilibili.com",
        },
        {
          text: "custom2",
          click: (player) => {
            console.log(player);
          },
        },
      ],
      highlight: [
        //进度条上的自定义时间标记
        // 进度条时间点高亮
        {
          text: "10M",
          time: 6,
        },
        {
          text: "20M",
          time: 12,
        },
      ],
    });
    const danmaku = {
      text: 'Get a danmaku via WebSocket',
      color: '#fff',
      type: 'right',
    };
    dp.danmaku.draw(danmaku);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

/*1.amap_demo必须有高度：以下是css代码*/
#map_container {
  width: 100%;
  height: 210px;
}

.amap_demo {
  width: 100%;
  height: 100%;
}
</style>
