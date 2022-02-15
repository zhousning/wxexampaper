// pages/todos/qes_list/qes_list.js
const config = require("../../../utils/setting")
const app = getApp()
Page({

    options: {
        addGlobalClass: true
    },
    /**
     * 页面的初始数据
     */
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        gridCol:2,
        skin: false,
        cardCur: 0,
        iconList: [],
        qes_lib: null,
        qes_type: []
    },

    onLoad: function (options) {
        this.setData({
            qes_lib: options.qes_lib
        })
    },
    onShow: function () {
        wx.showLoading({
            title: '数据加载中',
        })
        var that = this;
        var openid = wx.getStorageSync('openid');

        wx.request({
            url: config.routes.host + '/qes_banks/query_lib_all?qes_lib_name=' + that.data.qes_lib,
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
                        name: i + 1 + '',
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
    },
})