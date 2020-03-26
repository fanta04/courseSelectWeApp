// pages/courseDetail/courseDetail.js
const app = getApp()
const db = wx.cloud.database()
const courseCollection = db.collection("course")

Component({

  /**
   * 页面的初始数据
   */
  data: {
    courseName:"",
    xuefen:"",
    teacherName:"",
    time:"",
    desc:""
  },

  methods:{
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
      var that = this
      courseCollection.where({
        courseName: app.globalData.courseName
      }).get().then(res=>{
        console.log(res)
        that.setData({
          courseName: res.data[0].courseName,
          time: res.data[0].time,
          xuefen: res.data[0].xuefen,
          teacherName: res.data[0].teacherName,
          desc: res.data[0].desc
        })
      })
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
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
  }
})