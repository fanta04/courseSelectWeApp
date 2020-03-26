//app.js
App({
  onLaunch: function () {
    if(wx.cloud){
      wx.cloud.init({
        env:"cloud01-8y6q9",
        traceUser:true
      })
      wx.cloud.callFunction({
        name:"getOpenId"
      }).then(res=>{
        this.globalData.openid = res.result.openid
      })
    }
  },
  globalData:{
    username: "cqm",
    uid:"",
    password:"",
    identity:"",
    courses:[],
    courseName:"",
    openid:""
  }
})