
//index.js
const util = require('../../utils/util.js')
var config = require("../../config.js")
var app = getApp()
Page({
  data: {
    imgUrls: [
      '../../images/girl2.jpeg',
      '../../images/girl.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493698928333&di=99be91f1067ce820af8235607706813a&imgtype=0&src=http%3A%2F%2Fimg.tupianzj.com%2Fuploads%2Fallimg%2F160412%2F9-160412091538.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493698928333&di=ae56672831512cc7d4cd1e26d31269aa&imgtype=0&src=http%3A%2F%2Fimg.tupianzj.com%2Fuploads%2Fallimg%2F160412%2F9-160412091540.jpg'
    ],
    indicatorDots: true,

    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  to_detail:function(e){
    var hno = e.currentTarget.dataset.hno;
    var url = "../detail/detail?hno=" + hno;
    wx.navigateTo({
      url: url
    })
  },
  onLoad: function (options) {
    app.getUserinfo();
    console.log("asd");
    var that = this;
    wx.request({
      url: config.host + '/index',
      data: {},
      method: 'GET',
      header: {
        'Authorization': "JWT ",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        console.log(res);
        var lists = res.data;
        console.log(lists);
        that.setData({ lists: lists })
      }
    })
  }
})
