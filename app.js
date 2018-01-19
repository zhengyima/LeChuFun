//app.js
var config = require("config.js")
App({
  onLaunch: function () {
    // 展示本地存储能力
    console.log("on launch in!");
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
  },
  globalData: {
    userInfo: null
  },
  getUserinfo: function () {
    wx.login({
      success: loginres => {
        console.log("login success in!");
        //console.log(res)
        wx.getUserInfo({
          success: res => {
            console.log("getuserinfo success in!");
            console.log({
              code: loginres.code,
              iv: res.iv,
              encryeddata: res.encryptedData,
              signature: res.signature,
              rawData: res.rawData,
            });
            //console.log(loginres)
            //console.log(res)
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo
            if (loginres.code) {
              console.log("getuserinfo success in!");
              wx.request({
                url: config.host + '/login',
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                method: 'GET',
                data: {
                  code: loginres.code,
                  iv: res.iv,
                  encryeddata: res.encryptedData,
                  signature: res.signature,
                  rawData: res.rawData,
                },
                success: function (data) {

                  console.log(data.data.openid);
                  wx.setStorageSync('openid', data.data.openid);
                  //cb();
                },
                fail: function (data) {
                  console.log(data);
                }
              })
            }
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("getSettings success in!");
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy
          console.log({ latitude: latitude, longitude: longitude });      
          wx.setStorageSync('latitude', latitude);
          wx.setStorageSync('longitude', longitude);
          wx.setStorageSync('speed', speed);
          wx.setStorageSync('accuracy', accuracy);
          }
    });
  },
  reload: function () {
    var page = getCurrentPages().pop();
    if (page == undefined || page == null) return;
    page.onLoad();
  },
})