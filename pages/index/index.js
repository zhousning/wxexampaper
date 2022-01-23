Page({
  data: {
    PageCur: 'todos'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
})
