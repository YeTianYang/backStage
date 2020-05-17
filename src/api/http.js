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
export { login }