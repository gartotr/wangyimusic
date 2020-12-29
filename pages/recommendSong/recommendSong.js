// pages/recommendSong/recommendSong.js
import ajax from '../../utils/ajax'

import PubSub from 'pubsub-js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '',
    month: '',
    recommendList: [],
    currentIndex: null
  },

  /* 点击歌曲 */
  toSong(e) {
    const {
      id,
      index
    } = e.currentTarget.dataset

    this.setData({
      currentIndex: index
    })

    wx.navigateTo({
      url: `/pages/song/song?id=${id}`
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    /* 获取日期 */

    const day = new Date().getDate()
    const month = new Date().getMonth() + 1
    this.setData({
      day,
      month
    })

    const result = await ajax('/recommend/songs', "GET")
    const recommendList = result.recommend.slice(0, 10)
    this.setData({
      recommendList
    })
    const {
      listIndex
    } = this.data
    /* 上下一首歌 */
    PubSub.subscribe('test', (msg, data) => {
      let {
        currentIndex,
        recommendList
      } = this.data;

      if (data === 'next') {
        if (currentIndex === recommendList.length - 1) {
          currentIndex = 0;

        } else {
          currentIndex++;

        }
      }

      if (data === 'pre') {
        if (currentIndex === 0) {
          currentIndex = recommendList.length - 1;
        } else {
          currentIndex--;

        }
      }

      const songId = recommendList[currentIndex].id;

      this.setData({
        currentIndex
      })

      PubSub.publish('changeId', songId)
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const cookie = wx.getStorageSync('cookies')
    if (!cookie) {
      wx.showModal({
        title: '请登录',
        content: '是否跳转到登录',
        cancelText: '去首页',
        confirmText: '立即登录',
        success: (res) => {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
      return
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})