
//resnow.js
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
  to_detail:function(){
    wx.navigateTo({
      url: "../detail/detail"
    })
  },
  /*
  to_all: function () {
    wx.switchTab({
      url: '../resnow/resnow?type=1',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  },*/
  onLoad: function(options){
    console.log(options);
    var mytype = 0;
    if(options.type == undefined){mytype = 0;}
    else {mytype = options.type};
    this.setData({
      type: mytype
    })
    var that = this
    wx.request({
      url: config.host + '/res_index',
      data: { openid: wx.getStorageSync('openid')},
      method: 'GET',
      header: {
        'Authorization': "JWT ",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        console.log(res);
        //var lists = res.data;
        //console.log(lists);
        that.setData({ oh: res.data[0],contact:res.data[1][0] })
      }
    })
  },
  to_success:function(e){
    var pagenum = "date=" + e.currentTarget.dataset.date + "&";
    pagenum += "hno=" + e.currentTarget.dataset.hno + "&";
    pagenum += "start=" + e.currentTarget.dataset.start + "&";
    pagenum += "end=" + e.currentTarget.dataset.end + "&";
    //pagenum += "type=" + that.data.type + "&";
    pagenum += "num=" + e.currentTarget.dataset.num + "&";
    //pagenum += "ready=" + that.data.ready + "&";
    //pagenum += "equip=" + that.data.equip + "&";
    //pagenum += "barb=" + that.data.barb + "&";
    //pagenum += "fapiao=" + that.data.fapiao + "&";
    pagenum += "cno=" + e.currentTarget.dataset.cno + "&";
    pagenum += "price_total=" + e.currentTarget.dataset.total + "&";
    wx.redirectTo({
      url: "../res_detail/res_detail?" + pagenum
    })
  }
})
