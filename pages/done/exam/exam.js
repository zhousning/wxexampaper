const timer = require('../../../plugins/wxTimer')
const question = require('../../../datas/question')
const app = getApp()
Page({
  options: {
    addGlobalClass: true
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    questions: [],
    current: 0,
    previous: 0,
    next: 0,
    qes_type: '',
    answer: '', //用于换题后radio清空
    myAnswer: '', //用于给正确答案显示绿色字体
    previous_disabled: true,
    next_disabled: false,
    hiddenTrueAnswer: true,
    time_remaining: null,
    wxTimerList: {},
    mypaper: []
  },
  globalObj: {
    wxTimer: null
  },
  getAnswer(e) {
    var trueAnswer = e.currentTarget.dataset.trueval
    var answer = e.detail.value
    var myAnswer = ''

    if (trueAnswer == answer) {
      myAnswer = answer
    }
    this.setData({
      answer: answer,
      myAnswer: myAnswer
    })
  },
  showTrueAnswer: function () {
    this.setData({
      hiddenTrueAnswer: false
    })
  },
  previousQes: function () {
    var val = this.data.current - 1
    this.setData({
      next_disabled: false,
      answer: '',
      current: val,
      myAnswer: '',
      hiddenTrueAnswer: true
    })
    if (val == 0) {
      this.setData({
        previous_disabled: true
      })
    } else {
      this.setData({
        previous_disabled: false
      })
    }
  },
  nextQes: function () {
    var val = this.data.current + 1
    var qes = this.data.questions
    console.log('...')
    this.setData({
      previous_disabled: false,
      answer: '',
      current: val,
      myAnswer: '',
      hiddenTrueAnswer: true
    })
    if (val == qes.length - 1) {
      this.setData({
        next_disabled: true
      })
    } else {
      this.setData({
        next_disabled: false
      })
    }
  },

  onLoad: function (options) {
    var that = this;
    that.setData({
      questions: question.questions.items,
      mypaper: question.questions.items
    })
    // // var openid = wx.getStorageSync('openid');
    // // var qes_lib = options.qes_lib;
    // // var type = options.type

    // // wx.showLoading({
    // //   title: '数据加载中',
    // // })
    // // wx.request({
    // //   url:  app.globalData.setting.routes.host + '/qes_banks/' + qes_lib + '/' + type + '/query_all',
    // //   header: {
    // //     'Accept': "*/*",
    // //     'content-type': 'application/json' // 默认值
    // //   },
    // //   data: {
    // //     openid: openid
    // //   },
    // //   success: function (res) {
    // //     var objs = res.data;
    // //     var qes_type = '';
    // //     switch (type) {
    // //       case 'singles':
    // //         qes_type = '单选题'
    // //         break;
    // //         case 'mcqs':
    // //         qes_type = '多选题'
    // //         break;
    // //         case 'tofs':
    // //         qes_type = '判断题'
    // //         break;
    // //         case 'qaas':
    // //         qes_type = '问答题'
    // //         break;
    // //     }
    // //     that.setData({
    // //       questions: objs,
    // //       qes_type: qes_type
    // //     })
    // //     wx.hideLoading();
    // //   },
    // //   fail: function () {
    // //     wx.hideLoading();
    // //   }
    // })
  },

  onReady: function () {
    var that = this;
    that.globalObj.wxTimer = new timer({
      beginTime: "00:12:10",
      name: 'wxTimer',
      complete: function () {
        console.log("完成了")
      },
      interval: 2,
      intervalFn: function () {
        console.log('read 2');
      }
    })
    that.globalObj.wxTimer.start(that);
  },

  onShow: function () {

  },

  onHide: function () {


  },

  onUnload: function () {
    var that = this;
    that.globalObj.wxTimer.stop();
    wx.showModal({
      title: '提示',
      content: '考试进行中，离开将不计入考试成绩',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})