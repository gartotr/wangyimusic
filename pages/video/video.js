// pages/video/video.js
import ajax from '../../utils/ajax'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    currentId: 58100,
    scrollId: '',
    videoList: [],
    flag: false,
    videoId: ''
  },

  //点击scroll滚动条
  clicknScroll(e) {
    const {
      id
    } = e.currentTarget.dataset
    const scrollId = e.currentTarget.id
    this.setData({
      currentId: id,
      scrollId
    })
    this.getvideoList()
  },

  //发送请求视频
  async getvideoList() {
    this.setData({
      videoList: []
    })
    wx.showLoading({
      title: '加载中,请稍后',
    })

    const res = await ajax('/video/group', 'GET', {
      id: this.data.currentId
    })

    const videoList = res.datas.map((item) => {
      return item.data
    })
    this.setData({
      videoList
    })
    wx.hideLoading()
  },

  //下拉
  pullDown() {
    this.getvideoList()
    this.setData({
      flag: false
    })
  },
  //上拉
  pullUp() {
    if (this.refresh) return
    this.refresh = true
    setTimeout(() => {
      const data = JSON.parse(JSON.stringify(this.data.videoList))
      this.setData({
        videoList: [...this.data.videoList, ...data]
      })
      this.refresh = false
    }, 1000)

  },


  videoPlayStart(e) {
    const oldVid = this.oldVid
    const {
      id
    } = e.currentTarget

    if (oldVid && oldVid != id) {
      const videoContext = wx.createVideoContext(this.oldVid)
      videoContext.pause()
    }

    this.oldVid = id
  },

  /*   videoPlayPause(e){
      console.log('videoPlayPause',e);
      const videoContext = wx.createVideoContext(this.videoVid)
      videoContext.pause()

    }, */
  /* 切换显示 */
  showVideo(e) {

    const {
      id
    } = e.currentTarget

    this.setData({
      videoId: id
    })

    const videoContext = wx.createVideoContext(id)
    videoContext.play()
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    const cookie = wx.getStorageSync('cookies')
    if(!cookie){
      wx.showModal({
        title:'请登录',
        content:'是否跳转到登录',
        cancelText:'去首页',
        confirmText:'立即登录',
        success:(res)=>{
          if(res.confirm){
            wx.redirectTo({
              url: '/pages/login/login',
            })
          }else{
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
      return
    }
    ajax("/video/group/list", "GET").then((res) => {
      const videoGroupList = res.data.slice(0, 14)
      this.setData({
        videoGroupList
      })
    }).catch((err) => {
      console.log(err);
    })
    this.getvideoList()
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
  onPullDownRefresh: async function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function ({from,target}) {

    const {title,url} = target.dataset
    if(from === 'button'){
      return {
        title,
        path:"/pages/video/video",
        imageUrl: url
      }
    }
  }
})