import http from '@/utils/request'

export function getData() {
    return http({
        method: "GET",
        url: "/home/getData"
    })
}
export function getUser(params) {
    // return http({
    //     method: "GET",
    //     url: "/user/getUser"
    // })
    return http.get('/user/getUser', params)
}
export function addUser(data) {
    return http.post('/user/add', data)
}
export function editUser(data) {
    return http.post('/user/edit', data)
}
export function delUser(data) {
    return http.post('/user/del', data)
}
export function getMenu(data) {
    return http.post('/permission/getMenu', data)
}