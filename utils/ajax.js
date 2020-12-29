export default function (url, method = 'GET', data = {}) {
  const BASE_URL = 'https://wangyimusic.cn.utools.club'
  // const BASE_URL = 'http://localhost:3000'
  return new Promise((resolve, reject) => {
    let cookieStr = wx.getStorageSync('cookies')
    let cookies = []
   if(cookieStr){
    cookies = JSON.parse(cookieStr)
   }

    wx.request({
      url: `${BASE_URL}` + url,
      method,
      data,
      header:{
        cookie:Array.prototype.toString.call(cookies)
      },
      success: (res) => {

        if (data.isLogin) {
          res.cookies
          let arr = res.cookies.filter((item) => {
            return item.indexOf('MUSIC_U') === 0;
          })
          
          wx.setStorage({
            data: JSON.stringify(arr),
            key: 'cookies',
          })
        }
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })

}