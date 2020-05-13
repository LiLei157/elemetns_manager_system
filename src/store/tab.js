import Cookie from 'js-cookie' // 导入cookie
export default {
  state: {
    isCollapse: false,
    currentmenu: null, //currentmenu存放当前点击的该menu菜单项，默认空对象
    navmenu: [], //navmenu中存放所有的菜单项
    menu: [], //用来存储登录返回来的动态路由列表
    tagList: [
      {
        icon: 'home',
        name: 'home',
        label: '首页 ',
        path: '/index'
      }
    ]
  },
  mutations: {
    //添加路由列表
    setMenu(state, val) {
      state.menu = val
      // 设置到Cookie中
      Cookie.set('menu', JSON.stringify(val))
      console.log(state.menu)
    },
    // 退出登录时，清除cookie和后台动态返回的router菜单
    clearMenu(state) {
      state.menu = []
      Cookie.remove('menu')
    },
    // 对路由menu列表进行处理，动态生成路由,router参数：router.addRoutes()动态添加路由参数
    addMenu(state, router) {
      console.log('addMenu...')
      // 当刷新vue程序时，数据都会丢失，所以需要从cookie中读取出router路由列表
      // 下面做一个空判断，防止没有获取到menu时报错
      if (!Cookie.get('menu')) {
        return
      }
      let menu = JSON.parse(Cookie.get('menu')) // 反序列化成对象
      state.menu = menu
      // 主页面,home,user,other等路由都是它的嵌套子路由
      let mainMenu = [
        {
          path: '/',
          component: () => import('@/views/Main'),
          children: []
        }
      ]
      menu.forEach(item => {
        // console.log(item.name)
        console.log('menu', state.menu)
        // 路由列表分2种情况，有嵌套路由和无嵌套路由的
        if (item.children) {
          // 有嵌套路由,需要使用map函数来给children数组中每一个路由拼接字符串，使用路由懒加载
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`)
            // console.log('children:', item.children)
            return item // 把每个拼接处理后的字符串返回
          })
          // 如果有嵌套子路由即子菜单，真正跳转的是子菜单，所以是item.children
          console.log('item.children解构赋值:', ...item.children)
          mainMenu[0].children.push(...item.children)
        } else {
          //没有嵌套路由,则直接拼接，路由跳转就是该路由
          item.component = () => import(`@/views/${item.url}`)
          mainMenu[0].children.push(item)
        }
        console.log(mainMenu)
      })
      console.log('router:', router)
      router.addRoutes(mainMenu)
    },
    selectorMenu(state, val) {
      // // 这里根据选中的菜单项赋值给currentmenu对象

      if (val.name === 'home') {
        // 对tagList中的数据进行去重处理，如果重复的不再添加到tagList中
        state.currentmenu = null
      } else {
        state.currentmenu = val
        let result = state.tagList.findIndex(item => item.name === val.name)
        result === -1 ? state.tagList.push(val) : '' // 如果findIndex返回-1则表示数组中找不到某个元素
        Cookie.set('tagList', JSON.stringify(state.tagList)) // 把tagList序列化成字符串放进Cookie中
      }
    },
    getMenu(state) {
      if (Cookie.get('tagList')) {
        let tagList = JSON.parse(Cookie.get('tagList'))
        state.tagList = tagList
      }
    },
    closeTag(state, val) {
      let index = state.tagList.findIndex(item => item.name == val.name)
      state.tagList.splice(index, 1)
      Cookie.set('tagList', JSON.stringify(state.tagList))
    },
    Collapse(state) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {}
}
