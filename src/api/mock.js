import Mock from 'mockjs';
import homeApi from './mockServerData/home'
import userApi from './mockServerData/user'
import permission from './mockServerData/permission'

// 定义mock请求拦截
// Mock.mock('/api/home/getData', function () {
//     //拦截请求后的处理
//     console.log("拦截成功")
//     return {
//         neiyu: '完了'
//     }
// })
Mock.mock('/api/home/getData', homeApi.getStatisticalData)
Mock.mock(/api\/user\/getUser/, userApi.getUserList)
Mock.mock('/api/user/add', userApi.createUser)
Mock.mock('/api/user/edit', userApi.updateUser)
Mock.mock('/api/user/del', userApi.deleteUser)
Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)