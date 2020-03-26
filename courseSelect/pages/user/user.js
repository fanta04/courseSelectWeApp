var app = getApp()
var db = wx.cloud.database()
var userCollection = db.collection("user")

Page({
/**
 * 显示天气
 */
  data: {
    username:"",
    identity:"",
    city: "",
    today: {},
  },
  onLoad: function () {
    this.data.username = app.globalData.username;
    this.data.identity = app.globalData.identity;
    this.loadInfo();
    console.log(this.data.username,this.data.identity)
  },
  loadInfo: function () {
    var page = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude, longitude);
        page.loadCity(latitude, longitude);
      }
    })
  },
  loadCity: function (latitude, longitude) {
    var page = this;
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=D6WOzHaymzVVKvgiy8UbhQEznkgeK6BD&location='
        + latitude + ',' + longitude + '&output=json',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var city = res.data.result.addressComponent.city;
        city = city.replace("市", "");
        page.setData({ city: city });
        page.loadWeather(city);
      }
    })
  },
  loadWeather: function (city) {
    var page = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        today.todayInfo = todayInfo;
        page.setData({ today: today});
        console.log(today.wendu);
      }
    });
  },
  notify:function(){
    wx.showModal({
      title: '提示',
      content: '您没有该项操作权限',
    })
  },
  /**
   * 选课
   */
  select:function(e){
    var page = this
    if (this.data.identity == "teacher") {
      page.notify()
    }
    else {
      wx.navigateTo({
        url: '../select/select'
      })
    }
  },
  /**
   * 开课
   */
  open: function (e) {
    var page = this
    if(this.data.identity=="student"){
      page.notify()
    }
    else {
      wx.navigateTo({
        url: '../openCourse/openCourse',
      })
    }
  },
  /**
   *查看课程
   */
  showCourse: function (e) {
    var page = this
    if (this.data.identity == "teacher") {
      page.notify()
    }
    else {
      wx.navigateTo({
        url: '../myCourse/myCourse',
      })
    }
  },
  
  /**
   * Github地址
   */
  github:function(e){
    wx.setClipboardData({
      data: 'https://github.com/fanta04/courseSelectWeApp',
      success(res) {
        wx.getClipboardData({
          success(res) {
            console.log(res.data) // data
          }
        })
      }
    })
  }
})