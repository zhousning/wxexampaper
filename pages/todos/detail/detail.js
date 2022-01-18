// pages/todos/detail/detail.js
const config = require('../../../utils/setting')
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
    var openid = wx.getStorageSync('openid');
    var qes_lib = this.data.qes_lib;
    var qes_type = [{
        'icon': 'ticket',
        'title': '单选题',
        'url': '/pages/todos/process/process?type=single&qes_lib=' + qes_lib
      },
      {
        'icon': 'selection',
        'title': '多选题',
        'url': '/pages/todos/process/process?type=mcq&qes_lib=' + qes_lib
      },
      {
        'icon': 'choiceness',
        'title': '判断题',
        'url': '/pages/todos/process/process?type=tof&qes_lib=' + qes_lib
      },
      {
        'icon': 'upstage',
        'title': '问答题',
        'url': '/pages/todos/process/process?type=qaa&qes_lib=' + qes_lib
      }
    ]
    that.setData({
      qes_type: qes_type
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})