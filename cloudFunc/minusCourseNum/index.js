// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  const courseCollection = db.collection("course")
  return await courseCollection.where({
      courseName:event.courseName
  }).update({
    data:{
      num:_.inc(-1)
    }
  })
}