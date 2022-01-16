// pages/todos/process/process.js
const app = getApp()

Component({
  options: {
    addGlobalClass: true
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    gridCol:3,
    skin: false,
    iconList: [{
      icon: 'cardboardfill',
      color: 'blue',
      badge: 120,
      name: 'VR'
    }, {
      icon: 'recordfill',
      color: 'blue',
      badge: 1,
      name: '录像'
    }, {
      icon: 'picfill',
      color: 'blue',
      badge: 0,
      name: '图像'
    }, {
      icon: 'noticefill',
      color: 'blue',
      badge: 22,
      name: '通知'
    }, {
      icon: 'upstagefill',
      color: 'blue',
      badge: 0,
      name: '排行榜'
    }, {
      icon: 'clothesfill',
      color: 'blue',
      badge: 0,
      name: '皮肤'
    }, {
      icon: 'discoverfill',
      color: 'blue',
      badge: 0,
      name: '发现'
    }, {
      icon: 'questionfill',
      color: 'blue',
      badge: 0,
      name: '帮助'
    }, {
      icon: 'commandfill',
      color: 'blue',
      badge: 0,
      name: '问答'
    }, {
      icon: 'brandfill',
      color: 'blue',
      badge: 0,
      name: '版权'
    }],
  }
})
