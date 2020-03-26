// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const courseListCollection = db.collection("list")
const courseCollection = db.collection("course")


// 云函数入口函数
exports.main = async (event, context) => {
  var temp = []
  return new Promise((resolve,reject)=>{
    courseListCollection.where({
      stuName:event.stuName
    }).get().then(res=>{
      var coursesName = res.data[0].courseName
      for(var i = 0;i<coursesName.length;i++){
        courseCollection.where({
          courseName:coursesName[i]
        }).get().then(res=>{
          temp.push(res.data[0])
        })
      }
      resolve(temp)
    })
  })
}