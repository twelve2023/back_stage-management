import http from '../utils/request'

// 获取首页数据
export const getData=()=>{
    return http.get('/home/getData')
}
export const getUser=(params)=>{
    return http.get('/user/getUser',params)
}
export const addUser=(data)=>{
    return http.post('/user/add',data)
}
export const deleteUser=(data)=>{
    return http.post('/user/del',data)
}
export const editUser=(data)=>{
    return http.post('/user/edit',data)
}
export const getMenu=(params)=>{
    return http.post('/permission/getMenu',params)
}