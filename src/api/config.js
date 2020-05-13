import axios from 'axios'

//1、创建axios实例
const Serve = axios.create({
  timeout: 3000 // 设置3s超时
})

// 2、请求拦截相关设置,这里只是简单返回
Serve.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return error
  }
)

// 3、响应拦截相关设置，比如响应状态码200做什么操作，400做什么操作
Serve.interceptors.response.use(response => {
  let res = {}
  res.status = response.status
  res.data = response.data
  return res
})

// 4、axios请求拦截设置好后，把axios作为属性挂载到main.js中Vue的原型对象上
export default Serve // 把定义的axios相关配置的Serve对象暴露出去供使用
