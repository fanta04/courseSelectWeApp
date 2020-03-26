## 项目简介
本项目是基于微信小程序的选课系统，前端采用Vant-Weapp组件，后端采用云开发环境。主要功能有：用户注册登录、学生选课、老师开课、查看我的课程、查看课程详情以及天气预报。
## 项目截图
<div>
  <img src="https://github.com/fanta04/courseSelectWeApp/blob/master/project_pics/IMG_1712.PNG" width=250px />
  <img src="https://github.com/fanta04/courseSelectWeApp/blob/master/project_pics/IMG_1713.PNG" width=250px />
  <img src="https://github.com/fanta04/courseSelectWeApp/blob/master/project_pics/IMG_1714.PNG" width=250px />
</div>
<div>
  <img src="https://github.com/fanta04/courseSelectWeApp/blob/master/project_pics/IMG_1715.PNG" width=250px />
  <img src="https://github.com/fanta04/courseSelectWeApp/blob/master/project_pics/IMG_1717.PNG" width=250px />
  <img src="https://github.com/fanta04/courseSelectWeApp/blob/master/project_pics/IMG_1718.PNG" width=250px />
</div>
<div>
  <img src="https://github.com/fanta04/courseSelectWeApp/blob/master/project_pics/IMG_1719.PNG" width=250px />
  <img src="https://github.com/fanta04/courseSelectWeApp/blob/master/project_pics/IMG_1720.PNG" width=250px />
</div>

## 项目使用

 1. 使用git clone命令克隆本仓库
 2. 在微信开发者工具中导入本项目文件，选择云开发
 3. 在你的电脑上安装node.js，小程序内构建npm，详见：https://youzan.github.io/vant-weapp/#/quickstart
 4. 在云开发的云数据库中创建course、list、user三个集合

## 功能说明
### index页面

 - **页面描述：** 用户注册登录页面
 - **功能实现：** 
 	- judge()：判断信息填写是否完整
 	- handleReg()：判断是否是学生，老师不可以注册；判断用户是否已经存在；讲用户信息写入云数据库。
 	- handleLogin()：检查云数据库中是否存在该用户；跳转到user页面
 		  
 ### user页面

 - **页面描述：** 提供用户操作选项：我要选课，我的课程，我要开课，天气预报
 - **功能实现：** 
 	- 天气预报：利用微信API获取用户经纬度；百度地图API将经纬度转换为城市名；天气预报API获得今日天气
 	- select()：判断是否是学生；跳转到select页面
 	- showCourse()：判断是否是学生；跳转到myCourse页面
 	- open()：判断是否是老师；跳转到openCourse页面

 ### select页面

 - **页面描述：** 展示课程，提供选课操作，查看课程详情操作
 - **功能实现：** 
 	- onLoad()：读入course集合中的课程信息，交由wxml渲染列表
 	- select()：判断该用户是否已经选择该课程；判断课程余量是否充足；向list集合写入学生姓名和该学生所选课程；相应课程余量-1
 	- refresh()：下拉刷新操作，实时更新课程余量
 	- into_coursePage()：跳转到课程详情页面
 ### openCourse页面

 - **页面描述：** 提供老师开课功能
 - **功能实现：** 
 	- handleOpen()：判断课程信息是否填写完整；向course集合中写入数据
 		  
 		  
 ### myCourse页面
 - **页面描述：** 查看已经选择的课程，提供退选操作
 - **功能实现：** 
 	- onLoad()：加载我的课程
 	- into_coursePage()：跳转到课程详情页面
 	- .quit()：退选课程；删除list集合中该用户对应课程；对应课程余量+1
 	- refresh()：下拉刷新操作，实时更新我的课程

 ### courseDetail页面
 - **页面描述：** 展示课程详情
 - **功能实现：** 
 	- onLoad()：加载课程详情，交由wxml渲染
