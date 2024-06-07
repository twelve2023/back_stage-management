
// 前端模拟后端接口的工具，通过拦截前端发起的请求，自己定义返回数据
import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'

Mock.mock('/api/home/getData','get',homeApi.getStatisticalData)

// 用户列表
// 获取用户数据
Mock.mock(/api\/user\/getUser/,'get',user.getUserList)
// 新增用户
Mock.mock('/api/user/add','post',user.createUser)
// 删除
Mock.mock('/api/user/del','post',user.deleteUser)
// 更新
Mock.mock('/api/user/edit','post',user.updateUser)

// 登录页面
Mock.mock(/api\/permission\/getMenu/,'post', permission.getMenu)