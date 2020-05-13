/*
 * @Author: your name
 * @Date: 2020-05-08 14:33:55
 * @LastEditTime: 2020-05-12 14:44:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ele-manager\src\mock\goods\list.js
 */
let list = [
  {
    type: 1,
    label: '德尔玛家用床上除螨仪/吸尘器杀菌净化45min续航一体收纳充电CM2000白色',
    image:
      'http://demo26.crmeb.net/uploads/attach/2019/05/23/33fb5f29f0f52236a85831c8655b9bde.jpg',
    discribe: '',
    ficti: 20,
    price: 299,
    classify: '卫浴清洁',
    stock: 10000,
    sales: 68,
    status: true,
    unit_name: '件',
    keywords: ''
  },
  {
    type: 2,
    label: '云麦体脂秤称重女智能精准成人脂肪测量仪家用电子体重秤',
    image:
      'http://demo26.crmeb.net/uploads/attach/2019/05/23/fb40e23473563d0853bb02bc4baa2ea2.jpg',
    discribe: '',
    ficti: 30,
    price: 99,
    classify: '日用杂货',
    stock: 0,
    sales: 90,
    status: true,
    unit_name: '台',
    keywords: ''
  },
  {
    type: 1,
    label:
      '荣耀20青春版 AMOLED屏幕指纹 4000mAh大电池 20W快充 4800万 手机 6GB+64GB 冰岛幻境',
    image:
      'http://demo26.crmeb.net/uploads/attach/2020/04/27/b2bf3cf3be8a983c1920da54fb9f8579.jpg',
    discribe: '',
    ficti: 22,
    price: 2699,
    classify: '数码产品',
    stock: 800,
    sales: 10,
    status: true,
    unit_name: '台',
    keywords: ''
  },
  {
    type: 2,
    label: '【超品预售】TOMFORD汤姆福特唇膏4色TF口红黑管套装礼盒16',
    image:
      'http://demo26.crmeb.net/uploads/attach/2020/04/24/7092e35b87c2849b5f7c48b3e8175f98.jpg',
    discribe: '',
    ficti: 10,
    price: 399,
    classify: '彩妆香氛',
    stock: 30,
    sales: 10,
    status: false,
    unit_name: '件',
    keywords: ''
  },
  {
    type: 1,
    label: '极蜂天文望远镜天地两用可连接手机拍照望远镜观星星观月亮观景白色',
    image:
      'http://demo26.crmeb.net/uploads/attach/2019/05/23/759a8317831bbcf71d199277d2f3a8ce.jpg',
    discribe: '',
    ficti: 10,
    price: 399,
    classify: '数码产品',
    stock: 20,
    sales: 10,
    status: false,
    unit_name: '件',
    keywords: ''
  },
  {
    type: 2,
    label: '心想智能胶囊咖啡机S1102智能全自动手机APP可调2种模式',
    image:
      'http://demo26.crmeb.net/uploads/attach/2019/05/23/824200dd43d4eb8e7c185993c82b54ad.jpg',
    discribe: '',
    ficti: 10,
    price: 1999,
    classify: '数码产品',
    stock: 0,
    sales: 10,
    status: false,
    unit_name: '件',
    keywords: ''
  },
  {
    type: 1,
    label: '莱克吉米手持无线吸尘器除螨除尘组合家用大吸力静音',
    image:
      'http://demo26.crmeb.net/uploads/attach/2019/05/23/2a21667934bd7e26c7edd02687efdd34.jpg',
    discribe: '',
    ficti: 10,
    price: 499,
    classify: '卫浴清洁',
    stock: 400,
    sales: 10,
    status: false,
    unit_name: '件',
    keywords: ''
  },
  {
    type: 1,
    label: '火候进口整木砧板乌檀木实木家用厨房菜板防霉切菜板',
    image:
      'http://demo26.crmeb.net/uploads/attach/2019/05/23/4b77ed78767c49b05d365d01b1d95d99.jpg',
    discribe: '',
    ficti: 10,
    price: 499,
    classify: '日用杂货',
    stock: 50,
    sales: 10,
    status: false,
    unit_name: '件',
    keywords: ''
  },
  {
    type: 1,
    label: '本来设计挂钟原木时钟创意现代简约实木北欧客厅卧室钟表',
    discribe: '',
    image:
      'http://demo26.crmeb.net/uploads/attach/2019/05/23/fd79a0af5d4a3eda1572cae99f6725c5.jpg',
    ficti: 10,
    price: 499,
    classify: '日用杂货',
    stock: 30,
    sales: 10,
    status: false,
    unit_name: '件',
    keywords: ''
  },
  {
    type: 2,
    label: '本来设计挂钟原木时钟创意现代简约实木北欧客厅卧室钟表',
    image:
      'http://demo26.crmeb.net/uploads/attach/2019/05/23/fd79a0af5d4a3eda1572cae99f6725c5.jpg',
    discribe: '',
    ficti: 10,
    price: 1499,
    classify: '卫浴清洁',
    stock: 30,
    sales: 10,
    status: false,
    unit_name: '件',
    keywords: ''
  }
]
export default {
  // 获取商品列表
  products: () => {
    return {
      status: 0,
      message: 'success',
      data: list
    }
  },
  // 根据关键字查询
  findProducts: config => {
    console.log(config)
    let { keywords } = JSON.parse(config.body)
    let tmp = []
    list.map(item => {
      if (item.label.includes(keywords)) {
        tmp.push(item)
      }
    })
    return {
      status: 0,
      message: 'success',
      data: tmp
    }
  },
  // 新增数据
  add: config => {
    let body = JSON.parse(config.body)
    console.log('****', body.form)
    list.push(body.form)
    return {
      status: 0,
      message: 'insert success',
      data: list
    }
  }
}
