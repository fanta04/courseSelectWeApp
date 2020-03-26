// pages/select/select.js
var app = getApp()
var db = wx.cloud.database()
var courseCollection = db.collection("course")
var courseListCollection = db.collection("list")
var stuListCollection = db.collection("stuList")
var _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses: [],
    stuName:app.globalData.username
  },
  /**
   * 退选课程
   */
  quit(e){
    let courseName = e.target.id
    courseCollection.where({
      courseName:courseName
    }).update({
      data:{
        num:_.inc(1),
      }
    })
    courseListCollection.where({
      stuName:app.globalData.username
    }).update({
      data:{
        courseName:_.pull(courseName)
      }
    })
    stuListCollection.where({
      courseName:courseName
    }).update({
      data:{
        stuName:_.pull(app.globalData.username)
      }
    })
    wx.showToast({
      title: '退选成功',
    })
  },
  /**
   * 跳转到课程详细页面
   */
  into_coursePage: function (e) {
    console.log(e.currentTarget.dataset.coursename)
    app.globalData.courseName = e.currentTarget.dataset.coursename
    wx.navigateTo({
      url: '../courseDetail/courseDetail',
    })
  },
  async getMyCourses(stuName){
    var coursesName = []
    var p = await new Promise((resolve,reject)=>{
      courseListCollection.where({
        stuName: stuName
      }).get().then(res => {
        coursesName = res.data[0].courseName
        resolve(coursesName)
      })
    })
    return coursesName
  },
  addMyCourses:function(coursesName){
    var temp = []
    var prom = []
    for (var i = 0; i < coursesName.length; i++) {
      var p = new Promise((resolve,reject)=>{
        courseCollection.where({
          courseName: coursesName[i]
        }).get().then(res => {
          resolve(res.data[0])
        })
      })
      prom.push(p)
    }
    Promise.all(prom).then(res=>{
      this.setData({
        courses:res
      })
    })
    
  },
  /**
 * 生命周期函数--监听页面加载
 */
  async onLoad(options) {
    var stuName = app.globalData.username
    var temp = []
    var coursesName = []
    var p1 = await this.getMyCourses(stuName)
    await this.addMyCourses(p1)
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  async refresh() {
    var stuName = app.globalData.username
    var temp = []
    var coursesName = []
    var p1 = await this.getMyCourses(stuName)
    await this.addMyCourses(p1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  
})