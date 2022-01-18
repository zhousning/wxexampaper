// pages/todos/process/process.js
const config = require("../../../utils/setting")
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
      wx.showLoading({
        title: '数据加载中',
      })
      var that = this;
      var openid = wx.getStorageSync('openid');
      if (!openid) {
        wx.redirectTo({
          url: '/pages/login/login'
        })
        return;
      }
      wx.request({
        url: config.routes.host + '/qes_banks/query_all',
        header: {
          'Accept': "*/*",
          'content-type': 'application/json' // 默认值
        },
        data: {
          openid: openid
        },
        success: function (res) {
          var objs = res.data.results;
          var day_rpts = [];
          for (var i = 0; i < objs.length; i++) {
            day_rpts.push({
              url: '/pages/day_rpt/day_rpt?fct=' + objs[i].fct + '&day_pdt=' + objs[i].day_pdt + '&state=' + objs[i].state + '&jd=' + objs[i].jd,
              factory: objs[i].name,
              state: objs[i].state
            })
          }
          that.setData({
            day_rpts: day_rpts
          })
          wx.hideLoading();
        },
        fail: function () {
          wx.hideLoading();
        }
      })
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
