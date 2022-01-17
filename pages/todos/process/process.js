// pages/todos/process/process.js
const question_datas = require('../../../datas/question.js')
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
    attached: function () {
      this.setData({
        questions: question_datas.questions.items
      })
    }
  }
})