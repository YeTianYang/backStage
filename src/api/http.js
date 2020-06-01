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

//专门封装一个登录请求
const login = (username, password) => {
  return http.post("login", {
    username,
    password,
  });
};

//获取左边侧栏的请求
//发送请求时 不会自动加上token,需要手动添加
const menus = () => {
  return http.get("menus");
};

//获取用户列表的请求
const users = ({ query, pagenum, pagesize }) => {
  return http.get("users", {
    params: {
      query,
      pagenum,
      pagesize,
    },
  });
};

//新增用户的方法
const addUser = ({ username, password, email, mobile }) => {
  return http.post("users", {
    username,
    password,
    email,
    mobile,
  });
};

//修改用户状态的方法
const changeUserState = (uid,type)=>{
  return http.put(`users/${uid}/state/${type}`)
}

//修改用户的方法
const editUser = ({id,email,mobile})=>{
  return http.put(`users/${id}`,{
    email,
    mobile,
  })
}

export { login, menus, users, addUser,changeUserState ,editUser};
