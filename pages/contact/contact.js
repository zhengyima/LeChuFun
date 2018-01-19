const util = require('../../utils/util.js')
var config = require("../../config.js")
//contact.js
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
    types: ['聚会派对', '团建年会'],
    type_holder: '选择类型',
    time_holder_start: '开始时间',
    time_holder_end: '结束时间',
    date_holder: '请选择日期',
    nums: ['11到20人', '21到30人'],
    num_holder: '请选择人数',
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
      date_holder: ''
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
      time_holder_start: ''
    })
  },
  bindtypeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      type_index: e.detail.value,
      type_holder: ''
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
  bindname: function (e) {
    this.setData({
      name: e.detail.value
    });
  },
  bindphone: function (e) {
    this.setData({
      phone: e.detail.value
    });
  },
  bindwechat: function (e) {
    this.setData({
      wechat: e.detail.value
    });
  },
  bindfirm: function (e) {
    this.setData({
      firm: e.detail.value
    });
  },
  binddep: function (e) {
    this.setData({
      dep: e.detail.value
    });
  },
  bindcode: function (e) {
    this.setData({
      code: e.detail.value
    });
  },
  order_func: function (e) {
    console.log(this.data)
    if(this.data.name == undefined){
      wx.showToast({
        title: '请输入姓名~',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    if (this.data.phone == undefined) {
      wx.showToast({
        title: '请输入电话~',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    if (this.data.wechat == undefined) {
      wx.showToast({
        title: '请输入微信号~',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    var that = this
    var request_data = { hno: this.data.hno, date: this.data.date, start: this.data.start, end: this.data.end, type: this.data.type, num: this.data.num, ready: this.data.ready, equip: this.data.equip, barb: this.data.barb, fapiao: this.data.fapiao, tip: this.data.tip, price_total: this.data.price_total, name: this.data.name, phone: this.data.phone, wechat: this.data.wechat, firm: this.data.firm, dep: this.data.dep, code: this.data.code, openid: wx.getStorageSync('openid')}
    console.log(request_data)
    wx.request({
      url: config.host + '/contact_submit',
      data: request_data,
      method: 'GET',
      header: {
        'Authorization': "JWT ",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        console.log(res);
        //var lists = res.data[0];
        //console.log(lists);
        var pagenum = "date=" + that.data.date + "&";
        pagenum += "hno=" + that.data.hno + "&";
        pagenum += "start=" + that.data.start + "&";
        pagenum += "end=" + that.data.end + "&";
        pagenum += "type=" + that.data.type + "&";
        pagenum += "num=" + that.data.num + "&";
        pagenum += "ready=" + that.data.ready + "&";
        pagenum += "equip=" + that.data.equip + "&";
        pagenum += "barb=" + that.data.barb+ "&";
        pagenum += "fapiao=" + that.data.fapiao + "&";
        pagenum += "cno=" + res.data.cno + "&";
        pagenum += "price_total=" + that.data.price_total + "&";
        pagenum += "tip=" + that.data.tip;

        wx.navigateTo({
          url: "../term/term?"+pagenum
        })
      }
    })

    
  },
  onLoad: function (options) {
    console.log(options)
    this.setData(options)

    var that = this

    wx.request({
      url: config.host + '/contact',
      data: { hno: options.hno, timestart: options.start, timeend: options.end, date: options.date, num: options.num, openid: wx.getStorageSync('openid') },
      method: 'GET',
      header: {
        'Authorization': "JWT ",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        console.log(res);
        //var lists = res.data[0];
        //console.log(lists);
        that.setData({ date_text: res.data.date, house_info: res.data.house_info[0], detail: res.data.detail, price_ave: res.data.price_ave, price_total: res.data.price_total, time: res.data.time, name: res.data.contact.uname, phone: res.data.contact.uphone, wechat: res.data.contact.uwechat, firm: res.data.contact.ufirm, dep: res.data.contact.udepartment,code:res.data.contact.ucode });
      }
    })
  }
})
