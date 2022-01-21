const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '数据加载中',
        })
        var that = this;
        var openid = wx.getStorageSync('openid');
        var article_id = options.article_id
        if (!openid) {
            wx.redirectTo({
                url: '/pages/login/login'
            })
            return;
        }
        wx.request({
            url: app.globalData.setting.routes.host + '/essays/' + article_id + '/query_show',
            header: {
                'Accept': "*/*",
                'content-type': 'application/json' // 默认值
            },
            data: {
                openid: openid
            },
            success: function (res) {
                var obj = res.data;
                var article = {};
                article['title'] = obj.title
                article['dept'] = obj.dept
                article['date'] = obj.article_date
                article['content'] = obj.content
                that.setData({
                    article: article
                })
                wx.hideLoading();
            },
            fail: function () {
                wx.hideLoading();
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

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