/*
 * @Author: your name
 * @Date: 2020-01-05 21:46:50
 * @LastEditTime: 2020-05-12 14:09:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\mock\index.js
 */
import Mock from 'mockjs' //导入mock.js
import homeApi from './homeData'
import userApi from './user'
import loginApi from './permission'
import goodsApi from './goods/list'

//模拟真实网络请求的延时
Mock.setup({
  timeout: '200-300'
})
// 对mock数据的调用
Mock.mock(/\/home\/getData/, 'get', homeApi.getStatisticalData)
//获取用户数据列表
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
//编辑用户
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
//删除用户
Mock.mock(/\/user\/del/, 'get', userApi.deleteUser)
// 新增用户
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
// 动态获取路由菜单
Mock.mock(/\/login\/getMenu/, 'post', loginApi.getMenu)
// 获取商品分类
Mock.mock(/\/goods\/list/, 'get', goodsApi.products)
// 根据关键词查找数据
Mock.mock(/\/goods\/find/, 'post', goodsApi.findProducts)
// 添加商品数据
Mock.mock(/\/goods\/add/, 'post', goodsApi.add)
