const {
  default: ajax
} = require("../../utils/ajax")

import PubSub from 'pubsub-js'

import moment from 'moment'

const appInstance = getApp()

// pages/song/song.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    picUrl: '',
    musicUrl: '',
    isPlay: false,
    audioId: null,
    currentWidth: "",
    currentTime: "--:--",
    endTime: "--:--"
  },

  /* 点击播放 */
  handlePlay() {

    const backgroundAudioManager = wx.getBackgroundAudioManager()

    if (this.data.isPlay) {
      backgroundAudioManager.pause()
      this.setData({
        isPlay: false
      })
      appInstance.appData.isPlay = false
    } else {

      backgroundAudioManager.src = this.data.musicUrl;
      backgroundAudioManager.title = this.data.name;
      this.setData({
        isPlay: true
      })
      appInstance.appData.isPlay = true
      appInstance.appData.audioId = this.data.audioId

    }


  },

  /* 点击切换上下*/

  switchType(e) {
    
    const {
      id
    } = e.currentTarget
    /* PubSub 传递ID*/
    PubSub.publish('test', id);
  },

  /* 获取详情  并且设置到data*/
  async getMusicDetail(id) {
    const detail = await ajax('/song/detail?ids=' + id || e.currentTarget.id)
    const {
      name,
      dt
    } = detail.songs[0]
    console.log(detail)
    const {
      picUrl
    } = detail.songs[0].al

    this.setData({
      name,
      picUrl,
      audioId: id,
      endTime: moment(dt).format("mm:ss")
    })
  },

  /* 获取歌曲 */
  async getMusicUrl(id) {

    const result = await ajax('/song/url?id=' + id)
    /* 歌曲地址 */
    const musicUrl = result.data[0].url
    this.setData({
      musicUrl
    })
  },

  /* 音频事件的监听 */
  addEvent() {

    this.backgroundAudioManager.onPlay(() => {
      // console.log('onPlay')
      this.setData({
        isPlay: true
      })
      appInstance.appData.isPlay = true;
    })
    this.backgroundAudioManager.onPause(() => {
      // console.log('onPause')
      this.setData({
        isPlay: false
      })
      appInstance.appData.isPlay = false;
    })

    this.backgroundAudioManager.onTimeUpdate(() => {
      let currentTime = this.backgroundAudioManager.currentTime;
      let duration = this.backgroundAudioManager.duration;
      let currentWidth = currentTime / duration * 100;
      this.setData({
        currentWidth,
        currentTime: moment(currentTime * 1000).format("mm:ss")
      })
    })

     this.backgroundAudioManager.onEnded(()=>{
      
       PubSub.publish('test', 'next');
     })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {


    const isPlaying = appInstance.appData.isPlay
    const audioId = appInstance.appData.audioId

    const {
      id
    } = options

    /* 获取详情 */
    this.getMusicDetail(id)

    if (isPlaying && +id === +audioId) {
      this.setData({
        isPlay: true
      })
    }

    this.getMusicUrl(id)

    PubSub.subscribe('changeId', async(msg, data) => {

      this.setData({
        audioId: data
      })
      appInstance.appData.audioId = data

      this.getMusicDetail(data);
      await this.getMusicUrl(data)


      this.setData({
        isPlay: true
      })

      wx.playBackgroundAudio({
        dataUrl: this.data.musicUrl
      })

    })
    this.backgroundAudioManager = wx.getBackgroundAudioManager();

    this.addEvent()
   
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