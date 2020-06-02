//导入axios
import axios from "axios";
//设置基地址
const http = axios.create({
  baseURL: "http://localhost:8888/api/private/v1/",
});
//将axios 暴露出去
// export default http

//添加请求拦截器
http.interceptors.request.use(
  (config) => {
    //返回的config是一个对象 里面包含了请求头等信息
    //在config里添加token信息
    config.headers.Authorization = window.localStorage.getItem("token");
    // console.log(config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//获得角色列表
const roles = ()=>{
    return http.get("roles")
}
//分配角色
const userRole = ({id,rid})=>{
  return http.put(`users/${id}}/role`,{
    rid
  })
}
export {roles,userRole}