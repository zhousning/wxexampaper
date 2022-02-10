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
    hiddenTrueAnswer: true,
    modalName: ''
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

    let options = 'questions[' + current + '].options'
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
    let options = 'questions[' + current + '].options'
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
  //点击答题卡弹出模态框
  answer_sheet(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  //答题卡取消按钮
  cancelAnsSheet(e) {
    var questions = this.data.questions
    for (var i = 0; i < questions.length; i++) {
      questions[i].choose = false;
    }
    this.setData({
      modalName: null,
      questions: questions
    })
  },
  //答题卡确定按钮
  confirmAnsSheet(e) {
    var questions = this.data.questions
    var val = null
    var flag = false
    for (var i = 0; i < questions.length; i++) {
      if (questions[i].choose) {
        val = i;
        flag = true;
        break;
      }
    }
    if (flag) {
      for (var i = 0; i < questions.length; i++) {
        questions[i].choose = false;
      }
      var previous_disabled = true
      var next_disabled = true
      if (val == 0) {
        previous_disabled = true
      } else {
        previous_disabled = false
      }
      if (val == questions.length - 1) {
        next_disabled = true
      } else {
        next_disabled = false
      }
      this.setData({
        modalName: null,
        current: val,
        questions: questions,
        previous_disabled: previous_disabled,
        next_disabled: next_disabled
      })
    } else {
      this.setData({
        modalName: null
      })
    }
  },
  //选择编号显示绿色背景
  choose_qesnum(e) {
    var val = e.currentTarget.dataset.target
    var questions = this.data.questions
    for (var i = 0; i < questions.length; i++) {
      if (i == val) {
        questions[i].choose = true;
      } else {
        questions[i].choose = false;
      }
    }
    this.setData({
      questions: questions
    })
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
      url: app.globalData.setting.routes.host + '/qes_banks/' + qes_lib + '/' + type + '/query_all',
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