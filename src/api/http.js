//导入axios
import axios from 'axios'
//设置基地址
const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})
//将axios 暴露出去
// export default http

//专门封装一个登录请求
const login = (username, password) => {
  return http.post('login', {
    username,
    password
  })
}

//发送请求时 不会自动加上token,需要手动添加
const menus = ()=>{
  return http.get('menus',{
    headers:{
      Authorization : window.localStorage.getItem('token')
    }
  })
}

export { login,menus }