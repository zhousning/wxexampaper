// pages/todos/process/process.js
const question_datas = require('../../../datas/question.js')
const config = require('../../../utils/setting')
const app = getApp()

Component({
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
    qes_type: [],
    answer: '', //用于换题后radio清空
    myAnswer: '', //用于给正确答案显示绿色字体
    previous_disabled: true,
    next_disabled: false,
    hiddenTrueAnswer: true
  },
  methods: {
    getAnswer(e) {
      var trueAnswer = e.currentTarget.dataset.trueval
      var answer = e.detail.value
      var myAnswer = ''

      if (answer == trueAnswer) {
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
    }
  },
  lifetimes: {
    attached: function (options) {
      var that = this;
      var openid = wx.getStorageSync('openid');
      var qes_lib = this.data.qes_lib;
      var qes_type = [{
          'icon': 'ticket',
          'title': '单选题',
          'url': config.routes.host + '/qes_banks/' + qes_lib + '/singles/query_all'
        },
        {
          'icon': 'selection',
          'title': '多选题',
          'url': config.routes.host + '/qes_banks/' + qes_lib + '/mcqs/query_all'
        },
        {
          'icon': 'choiceness',
          'title': '判断题',
          'url': config.routes.host + '/qes_banks/' + qes_lib + '/tofs/query_all'
        },
        {
          'icon': 'upstage',
          'title': '问答题',
          'url': config.routes.host + '/qes_banks/' + qes_lib + '/qaas/query_all'
        }
      ]
      this.setData({
        questions: question_datas.questions.items
      })
    }
  }
})