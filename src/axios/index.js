import axios from "axios";
import config from "@/config";
import Vue from "vue";
import router from "@/router";

const instance = axios.create({ baseURL: config.apiBaseUrl })

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token')  // 如果本地存储有token则在请求中携带
    if (token) {
        config.headers.Authorization = token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


//   添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 成功的响应 2xx
    if (response.data.code !== 0) { // 业务错误代码
        Vue.prototype.$message.error(response.data.message)
        return Promise.reject(response)
    }
    return response
}, function (error) {
    // 失败的响应 2xx以外
    if (error.response && error.response.status === 401) {
        console.log(Vue.prototype)
        localStorage.removeItem('token')
        Vue.prototype.$message.error('登录信息失效，请重新登录')
        router.push("/")
    }
    return Promise.reject(error);
});

export default instance