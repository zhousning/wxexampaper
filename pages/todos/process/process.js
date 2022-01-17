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
    answer: '',
    previous_disabled: true,
    next_disabled: false
  },
  methods: {
    getAnswer(e) {
      this.setData({
        answer: e.detail.value
      })
    },
    previousQes: function () {
      var val = this.data.current - 1
      if (val == 0) {
        this.setData({
          previous_disabled: true,
          next_disabled: false,
          current: val
        })
      } else {
        this.setData({
          previous_disabled: false,
          next_disabled: false,
          current: val
        })
      }
    },
    nextQes: function () {
      var val = this.data.current + 1
      var qes = this.data.questions
      if (val == qes.length-1) {
        this.setData({
          previous_disabled: false,
          next_disabled: true,
          current: val
        })
      } else {
        this.setData({
          previous_disabled: false,
          next_disabled: false,
          current: val
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