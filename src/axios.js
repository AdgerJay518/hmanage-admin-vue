import axios from "axios";
import { Message, MessageBox } from 'element-ui'
import store from "./store";
import {getToken} from "./utils/auth"

//axios.defaults.baseURL="http://localhost:8081"
// 创建axios实例
const service = axios.create({
    baseURL: "http://localhost:8081", // api的base_url
    timeout: 15000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
        config.headers['Authorization'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非200是抛错 可结合自己业务进行修改
         */
        const res = response.data
        if (res.code !== 200) {
            Message({
                message: res.message,
                type: 'error',
                duration: 3 * 1000
            })

            // 401:未登录;
            if (res.code === 401) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload()// 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error)// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
        })
        return Promise.reject(error)
    }
)

export default service

// const request=axios.create({
//     timeout:5000,
//     headers:{
//         'Content-type':"application/json;charset=utf-8"
//     }
// })

// request.interceptors.request.use(config=>{
//     config.headers['Authorization']=localStorage.getItem("token")
//     return config
// })
//
// request.interceptors.response.use(response=>{
//     let res=response.data
//     console.log(res)
//     if (res.code===200){
//         return response
//     }else{
//         Element.Message.error(res.msg?res.msg:'msg系统异常')
//         return Promise.reject(response.data.msg)
//     }
// },
//     error=>{
//         console.log("err"+error)
//         if (error.response.data){
//             error.message=error.response.data.msg
//         }
//         if (error.response.status===401){
//             router.push("/login")
//         }
//         Element.Message.error(error.message,{duration:3000})
//         return Promise.reject(error)
//     })

//export default request
