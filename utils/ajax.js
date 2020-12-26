export default function (url, method = 'GET', data = {}) {
  const BASE_URL = 'https://wangyimusic.cn.utools.club'
  // const BASE_URL = 'http://localhost:3000'
  return new Promise((resolve, reject) => {
    wx.request({
      url:`${BASE_URL}` + url,
      method,
      data,
      success: (res) => {
        console.log(res);
        resolve(res.data)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })

}