// pages/todos/process/process.js
const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    gridCol:3,
    skin: false,
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    iconList: [{
      icon: 'cardboardfill',
      color: 'blue',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'blue',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'blue',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'blue',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'blue',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'blue',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'blue',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'blue',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'blue',
      badge: 0,
      name: '版权'
    }],
  },
  lifetimes: {
    attached: function() {
      //this.towerSwiper('swiperList'); // 初始化towerSwiper 传已有的数组名即可
    }
  },
  methods: {
    DotStyle: function(e) {
      this.setData({
        DotStyle: e.detail.value
      })
    },
    cardSwiper: function(e) {
      this.setData({
        cardCur: e.detail.current
      })
    }
  }
})
