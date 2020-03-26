// pages/openCourse/openCourse.js
var app = getApp()
var db = wx.cloud.database()
var courseCollection = db.collection("course")

Page({
  properties: {
    // 设置显示的波浪数量，只有1和2两个值
    waveNum: {
      type: Number,
      value: 1
    },
    // 动画运行状态
    waveStatus: {
      type: Boolean,
      value: true
    },
    // 波浪颜色
    background: {
      type: String,
      value: '#3b87dd'
    }
  },
  /**
 * 页面的初始数据
 */
  data: {
    courseName: "",
    time: "",
    num: "",
    xuefen: "",
    desc: ""

  },
  
  /**
 * 设置一系列变量
 */
  setName: function (e) {
    this.setData({ courseName: e.detail })
    console.log(this.data.courseName)
  },
  setTime: function (e) {
    this.setData({ time: e.detail })
    console.log(this.data.time)
  },
  setXuefen: function (e) {
    this.setData({ xuefen: e.detail })
    console.log(this.data.xuefen)
  },
  setNum: function (e) {
    this.setData({ num: e.detail })
    console.log(this.data.num)
  },
  setDesc: function (e) {
    this.setData({ desc: e.detail })
    console.log(this.data.desc)
  },
  /**
   * 开课按钮
   */
  handleOpen:function(e){
    var courseName = this.data.courseName
    var time = this.data.time
    var xuefen = this.data.xuefen
    var num = this.data.num
    var desc = this.data.desc
    var teacherName = app.globalData.username
    if(courseName==""||time==""||xuefen==""||num==""){
      wx.showModal({
        title: '开课失败',
        content: '请填写完整带*号的内容',
      })
    }
    else{
      courseCollection.add({
        data:{
          teacherName:teacherName,
          courseName:courseName,
          time:time,
          xuefen:parseInt(xuefen),
          num:parseInt(num),
          desc:desc,
        }
      }).then(res=>{
        wx.showToast({
          title: '开课成功',
          duration:4000
        })
        wx.redirectTo({
          url: '../user/user',
        })
      }).catch(err=>{
        console.log(err)
      })
    }
  }
})

