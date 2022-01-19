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
    gridCol:2,
    skin: false,
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../../images/swiper0001.png'
    }, {
      id: 1,
        type: 'image',
        url: '../../../images/swiper0002.png'
    },{
      id: 3,
      type: 'image',
      url: '../../../images/swiper0005.png'
    }],
    iconList: [],
  },
  lifetimes: {
    attached: function() {
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
              url: '/pages/todos/qes_index/qes_index?qes_lib=' + objs[i].id,
              icon: app.globalData.IconList[i],
              color: app.globalData.colors[i],
              badge: 1,
              name: i+1+'',
              title: objs[i].name
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
