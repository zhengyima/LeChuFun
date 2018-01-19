//details.js
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
    duration: 1000,
    markers: [{
      iconPath: "../../images/logo.jpeg",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 50,
      height: 50
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
  },
  to_detail:function(){
    wx.navigateTo({
      url: "../detail/detail"
    })
  },
  order_func:function(e){
    wx.navigateTo({
      url: "../Order/Order?hno=" +e.currentTarget.dataset.hno
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  onLoad: function (options) {
    app.getUserinfo();
    this.setData({ hno: options.hno });
    if(options.scene != undefined){
      var scene = decodeURIComponent(options.scene)
      this.setData({ hno: parseInt(scene) });
    }
    var hno = this.data.hno;
    console.log(options.scene);
    var that = this;
    wx.request({
      url: config.host + '/detail',
      data: {hno:hno},
      method: 'GET',
      header: {
        'Authorization': "JWT ",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        console.log(res);
        var lists = res.data[0];
        console.log(lists);
        that.setData({ lists: lists });
        that.setData({
          markers: [{
            iconPath: "../../images/logo.jpeg",
            id: 0,
            latitude: lists.hlatitude,
            longitude: lists.hlongitude,
            width: 50,
            height: 50
          }]})
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.lists.htitle1+"·"+this.data.lists.htitle2,
      desc: this.data.lists.htitle1 + "·" + this.data.lists.htitle2,
      path: "/pages/detail/detail?hno="+this.data.hno
    }
  },
})
