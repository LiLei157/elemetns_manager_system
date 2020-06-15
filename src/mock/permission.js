import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    if (username === 'admin' || username === 'wp') {
      // 判断账号和密码是否对应
      if (username === 'admin' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },
              {
                label: 'elementUI',
                icon: 's-cooperation',
                children: [
                  {
                    path: '/form',
                    name: 'form',
                    label: '表单组件',
                    url: 'ElementUI/Form'
                  },
                  {
                    path: '/tab',
                    name: 'tab',
                    label: '选项卡',
                    url: 'ElementUI/Tab'
                  }
                ]
              },
              {
                path: '/user',
                name: 'user',
                label: '用户管理页',
                icon: 'user',
                url: 'User/User'
              },
              {
                label: '商品',
                icon: 'goods',
                children: [
                  {
                    path: '/goodsManager',
                    name: 'goodsManager',
                    label: '商品管理',
                    url: 'Goods/GoodsManager'
                  },
                  {
                    path: '/GoodsClassify',
                    name: 'GoodsClassify',
                    label: '商品分类',
                    url: 'Goods/GoodsClassify'
                  },
                  {
                    path: '/GoodsData',
                    name: 'GoodsData',
                    label: '商品数据',
                    url: 'Goods/GoodsData'
                  },
                  {
                    path: '/GoodsSpecification',
                    name: 'GoodsSpecification',
                    label: '商品规格',
                    url: 'Goods/GoodsSpecification'
                  },
                  {
                    path: 'goodsEdit',
                    name: 'goodsEdit',
                    url: 'Goods/GoodsEdit'
                  }
                ]
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else if (username === 'wp' && password === '123456') {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
              },
              {
                path: '/video',
                name: 'video',
                label: '视频管理页',
                icon: 'video-play',
                url: 'VideoManage/VideoManage'
              }
            ],
            token: Mock.Random.guid(),
            message: '获取成功'
          }
        }
      } else {
        return {
          code: -999,
          data: {
            message: '密码错误'
          }
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '用户不存在'
        }
      }
    }
  }
}
