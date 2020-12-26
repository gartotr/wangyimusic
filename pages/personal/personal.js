// pages/personal/personal.js
import ajax from '../../utils/ajax'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveDistance: 0,
    moveTransition: "",
    nickname:'',
    avatarUrl:'',
    musicList:''

  },
  touchStart(e) {
    this.startY = e.touches[0].clientY
  },
  touchMove(e) {
    this.moveY = e.touches[0].clientY
    let moveDistance = Math.floor(this.moveY - this.startY)
    if (moveDistance < 0 || moveDistance > 80) return
    this.setData({
      moveDistance,
    })
  },
  touchEnd() {
    this.setData({
      moveDistance: 0,
      moveTransition: "transform 400ms"
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/login',
    })
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
    const res = wx.getStorageSync('userInfo')
    const {
      nickname,
      avatarUrl,
      userId
    } = JSON.parse(res)

    this.setData({
      nickname,
      avatarUrl,
    })

    ajax('/user/record',"GET",{
      uid:userId,
      type:1
    }).then((res)=>{
      this.setData({
        musicList:res.weekData
      })
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