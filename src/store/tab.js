import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false,
        tabList: [{
            path: "/",
            name: "home",
            label: "首页",
            icon: "House",
            url: "Home/Home"
        }],
        menu: []
    },
    mutations: {
        updateCollapse(state, value) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        updateBreadcrumb(state, value) {
            // console.log(state.tabList)
            // state.tabList = value
            // state.tabList = value
            if (value.name != 'home') {
                const index = state.tabList.findIndex(item => item.name == value.name)
                if (index == -1) {
                    state.tabList.push(value)
                }
            } else {
                state.tabList = []
                state.tabList.push(value)
            }
            // console.log(state.tabList);
        },
        closeTag(state, value) {
            const index = state.tabList.findIndex(item => item.name == value.name)
            state.tabList.splice(index, 1)
            console.log('111');

        },
        updateMenu(state, value) {
            state.menu = value
            Cookie.set('menu', JSON.stringify(value))
        },
        // 动态注册路由
        addMenu(state, router) {
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    },
}