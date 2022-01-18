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
    iconList: [],
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
          var objs = res.data;
          var iconList = [];
          for (var i = 0; i < objs.length; i++) {
            iconList.push({
              url: '/pages/todos/detail/detail?qes_lib=' + objs[i].id,
              icon: 'cardboardfill',
              color: 'blue',
              badge: 1,
              name: objs[i].name
            })
          }
          that.setData({
            iconList: iconList
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
