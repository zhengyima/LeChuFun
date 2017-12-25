//order.js
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
      iconPath: "../../images/logo.jpg",
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
    controls: [{
      id: 1,
      iconPath: '../../images/logo.jpg',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    types:['聚会派对','团建年会'],
    type_holder:'选择类型',
    time_holder_start:'开始时间',
    time_holder_end:'结束时间',
    date_holder:'请选择日期',
    nums:['11到20人','21到30人'],
    num_holder:'请选择人数',
    items: [
      { name: '0', value: '不需要', checked: 'true' },
      { name: '1', value: '提前1小时（免费）' },
      { name: '2', value: '提前2小时' },
      { name: '3', value: '提前3小时' },
    ],
    equips: [
      { name: '0', value: '不需要', checked: 'true' },
      { name: '1', value: 'XBOX(ONE)' },
    ]
  },
  to_detail: function () {
    wx.navigateTo({
      url: "../detail/detail"
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
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      date_holder:''
    })
  },
  bindTimeChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time2: e.detail.value,
      time_holder_end: ''
    })
  },
  bindTimeChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time1: e.detail.value,
      time_holder_start:''
    })
  },
  bindtypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      type_index: e.detail.value,
      type_holder:''
    })
  },
  bindnumChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      num_index: e.detail.value,
      num_holder: ''
    })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  }, 
  equipChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  bindneed: function (e) {
    this.setData({
      need: e.detail.value
    });
  },
  order_func:function(e){
    wx.navigateTo({
      url: "../contact/contact"
    })
  },
  onLoad: function (options) {
    //app.getUserinfo();
    var hno = options.hno;
    this.setData({ hno: hno });
    var that = this;
    wx.request({
      url: config.host + '/order',
      data: { hno: hno },
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
      }
    })
  }
})
