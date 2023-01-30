import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { House, User, Setting, ShoppingCart, DArrowLeft, Star, SuccessFilled, CircleCloseFilled, Plus } from "@element-plus/icons-vue"; //看自己需求取
import './api/mock'
import Cookie from 'js-cookie'


const app = createApp(App)
app.component('House', House);
app.component('User', User);
app.component('Setting', Setting);
app.component('ShoppingCart', ShoppingCart);
app.component('DArrowLeft', DArrowLeft);
app.component('Star', Star);
app.component('SuccessFilled', SuccessFilled);
app.component('CircleCloseFilled', CircleCloseFilled);
app.component('Plus', Plus);

// app.component('Tickets',Tickets);
router.beforeEach((to, from, next) => {
    const token = Cookie.get('token')
    if (!token && to.name !== 'Login') {
        next({ name: 'Login' })
    } else if (token && to.name === 'Login') {
        next({ name: 'home' })
    } else {
        next()
    }
})
createApp({
    created() {
        store.commit('addMenu', router)
    },
})
app.use(store).use(router).use(ElementPlus).mount('#app')

