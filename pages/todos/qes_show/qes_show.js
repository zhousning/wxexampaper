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
    answer: '', //用于换题后radio清空
    myAnswer: '', //用于给正确答案显示绿色字体
    previous_disabled: true,
    next_disabled: false,
    hiddenTrueAnswer: true
  },
  radioChange(e) {
    let current = this.data.current
    let questions = this.data.questions
    let items = questions[current].options
    for (let i = 0, len = items.length; i < len; ++i) {
      if (items[i].value === e.detail.value) {
        items[i].checked = true
        if (items[i].true_answer) {
          items[i].answer_true = true
        } else {
          items[i].answer_false = true
        }
      } else {
        items[i].checked = false
      }
    }

    let options = 'questions[' +current + '].options'
    this.setData({
      [options]: items
    })
  },
  checkboxChange(e) {
    let current = this.data.current
    let questions = this.data.questions
    let items = questions[current].options
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          if (items[i].true_answer) {
            items[i].answer_true = true
          } else {
            items[i].answer_false = true
          }
          break
        }
      }
    }
    let options = 'questions[' +current + '].options'
    this.setData({
      [options]: items
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
    var openid = wx.getStorageSync('openid');
    var qes_lib = options.qes_lib;
    var type = options.type

    wx.showLoading({
      title: '数据加载中',
    })
    wx.request({
      url:  app.globalData.setting.routes.host + '/qes_banks/' + qes_lib + '/' + type + '/query_all',
      header: {
        'Accept': "*/*",
        'content-type': 'application/json' // 默认值
      },
      data: {
        openid: openid
      },
      success: function (res) {
        var objs = res.data;

        that.setData({
          questions: objs
        })
        wx.hideLoading();
      },
      fail: function () {
        wx.hideLoading();
      }
    })
  }
})