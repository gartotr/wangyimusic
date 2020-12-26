import ajax from '../../utils/ajax.js';

Page({
  data: {
    recommendList: [],
    bannerList: [],
    topList: []
  },
  onLoad() {

    /* 轮播图 */
    ajax('/banner').then((res) => {
      this.setData({
        bannerList: res.banners
      })
    })
    // 排行榜
    ajax('/personalized?limit=10').then((res) => {
      this.setData({
        recommendList: res.result
      })
    })

    //排行榜
    let arr = [1, 3, 5]
    let index = 0
    let topList = []
    while (arr.length > index) {
      ajax('/top/list', 'GET', {
        idx: arr[index++]
      }).then((res) => {
        const obj ={
          name:res.playlist.name,
          list:res.playlist.tracks
        }
        topList.push(obj)
        this.setData({
          topList
        })
      })
    }




  }
})

// function Page(options){
//   this.data=JSON.parse(JSON.stringify(options.data));
// }
// new Vue({})