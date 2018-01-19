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
    times_text:"",
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
    nums:['1到5人','6到10人','11到20人','21到30人'],
    num_holder:'请选择人数',
    equip_flag:0,
    fapiao_flag:0,
    barb_flag:0,
    ready_flag:0,
    need_text:"",
    readyitems: [
      { name: '0', value: '不需要', checked: 'true' },
      { name: '1', value: '提前1小时（免费）' },
      { name: '2', value: '提前2小时' },
      { name: '3', value: '提前3小时' },
    ],
    equips: [
      { name: '0', value: '不需要', checked: 'true' },
      { name: '1', value: 'XBOX(ONE)' },
    ],
    fapiaos: [
      { name: '0', value: '不需要', checked: 'true' },
      { name: '1', value: '需要' },
    ],
    barbs: [
      { name: '0', value: '不需要', checked: 'true' },
      { name: '1', value: '需要' },
    ],
    time1:"07:00",
    time2:"09:00"
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
    var that = this
    this.setData({
      date: e.detail.value,
      date_holder:''
    })
    wx.request({
      url: config.host + '/check_date',
      data: { hno: this.data.hno,date:this.data.date },
      method: 'GET',
      header: {
        'Authorization': "JWT ",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        console.log(res);
        var str = ""
        for(var i=0;i<res.data.length;i++){
          str += res.data[i]['ostart']+"-"+res.data[i]['oend']+"   \n"
        }
        that.setData({times_text:str})
        console.log(str)
        //var lists = res.data[0];
        //console.log(lists);
        //that.setData({ lists: lists });
      }
    })


  },
  bindTimeChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      timeend: e.detail.value,
      time_holder_end: ''
    })
  },
  bindTimeChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      timestart: e.detail.value,
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
  readyChange: function (e) {
    console.log('入场准备发生change事件，携带value值为：', e.detail.value)
    this.setData({
      ready_flag:e.detail.value
    })
  }, 
  equipChange: function (e) {
    console.log('游戏发生change事件，携带value值为：', e.detail.value)
    this.setData({
      equip_flag: e.detail.value
    });
  },
  barbChange: function (e) {
    console.log('烧烤发生change事件，携带value值为：', e.detail.value)
    this.setData({
      barb_flag: e.detail.value
    });
  },
  faChange: function (e) {
    console.log('发票发生change事件，携带value值为：', e.detail.value)
    this.setData({
      fapiao_flag: e.detail.value
    });
  },
  bindneed: function (e) {
    console.log(e.detail.value)
    this.setData({
      need_text: e.detail.value
    });
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
  },
  order_func: function (e) {
    if (this.data.date == undefined || this.data.timestart == undefined || this.data.timeend == undefined){
      wx.showToast({
        title: '请选择日期时间!',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    if (this.data.type_index == undefined ) {
      wx.showToast({
        title: '请选择活动类型!',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    if (this.data.num_index == undefined) {
      wx.showToast({
        title: '请选择客人数量!',
        icon: 'success',
        duration: 2000
      })
      return;
    }
    var that = this;

    wx.request({
      url: config.host + '/check_time',
      data: { hno: this.data.hno, date: this.data.date,start:this.data.timestart,end:this.data.timeend },
      method: 'GET',
      header: {
        'Authorization': "JWT ",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
      success: function (res) {
        console.log(res);
        if(res.data.status == 0){
          wx.request({
            url: config.host + '/cal_price',
            data: { hno: that.data.hno, timestart: that.data.timestart, timeend: that.data.timeend },
            method: 'GET',
            header: {
              'Authorization': "JWT ",
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            success: function (res) {
              console.log(res);
              var price_total = res.data.total_price;
              if (price_total < 0) {
                wx.showToast({
                  title: '时间输入错误，是不是输反了呀!',
                  icon: 'success',
                  duration: 2000
                })
                return;
              }
              var pagenum = "date=" + that.data.date + "&";
              pagenum += "hno=" + that.data.hno + "&";
              pagenum += "start=" + that.data.timestart + "&";
              pagenum += "end=" + that.data.timeend + "&";
              pagenum += "type=" + that.data.type_index + "&";
              pagenum += "num=" + that.data.num_index + "&";
              pagenum += "ready=" + that.data.ready_flag + "&";
              pagenum += "equip=" + that.data.equip_flag + "&";
              pagenum += "barb=" + that.data.barb_flag + "&";
              pagenum += "fapiao=" + that.data.fapiao_flag + "&";
              pagenum += "fapiao=" + that.data.fapiao_flag + "&";
              pagenum += "tip=" + that.data.need_text;
              wx.navigateTo({
                url: "../contact/contact?" + pagenum
              })
            }
          })
        }
        else if(res.data.status == 1){
          wx.showToast({
            title: '已经被占用了',
            icon: 'success',
            duration: 2000
          })
          return;
        }
        else{
          wx.showToast({
            title: '时间非法',
            icon: 'success',
            duration: 2000
          })
          return;
        }
      }
    })


  },
})
