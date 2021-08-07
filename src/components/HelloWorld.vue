<template>
  <div id="dp" style="width: 885px;height: 500px"></div>
</template>

<script>
// import DPlayer from '../../node_modules/dplayer'
import DPlayer from 'dplayer'
// const dp = new DPlayer(options);


export default {
  data() {
    return {
      dp: null,
    }
  },
  methods: {
    onplay() {
      this.onplay();
    }
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
</style>
