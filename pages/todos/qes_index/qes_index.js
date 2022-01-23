// pages/todos/detail/detail.js
Page({
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    qes_lib: null,
    qes_type: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      qes_lib: options.qes_lib
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var qes_lib = this.data.qes_lib;
    var qes_type = [{
        'icon': 'ticket',
        'title': '单选题',
        'url': '/pages/todos/qes_show/qes_show?type=singles&qes_lib=' + qes_lib
      },
      {
        'icon': 'selection',
        'title': '多选题',
        'url': '/pages/todos/qes_show/qes_show?type=mcqs&qes_lib=' + qes_lib
      },
      {
        'icon': 'choiceness',
        'title': '判断题',
        'url': '/pages/todos/qes_show/qes_show?type=tofs&qes_lib=' + qes_lib
      },
      {
        'icon': 'upstage',
        'title': '问答题',
        'url': '/pages/todos/qes_show/qes_show?type=qaas&qes_lib=' + qes_lib
      }
    ]
    that.setData({
      qes_type: qes_type
    })
  }
})