// pages/login/login.js

import ajax from '../../utils/ajax'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: ''
  },



  getUserInfo(e) {
    const type = e.currentTarget.dataset.type
    this.setData({
      [type]: e.detail.value
    })
  },
  userLogin() {
    const {
      phone,
      password
    } = this.data
    // 18016650100
    ajax('/login/cellphone', 'GET', {
      phone,
      password
    }).then((res) => {
      wx.setStorage({
        key:"userInfo",
        data:JSON.stringify(res.profile)
      })
      wx.switchTab({
        url: '/pages/personal/personal',
      })
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