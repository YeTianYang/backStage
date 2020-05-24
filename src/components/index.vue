<template>
  <div class="index">
    <el-container class="my-con">
      <el-header class="my-header">
        <img src="../assets/img/logo.png" alt />
        <h2>电商后台管理系统</h2>
        <!-- 要记得阻止冒泡 -->
        <a href="#" @click.prevent="logout">退出</a>
      </el-header>
      <el-container>
        <el-aside width="200px" class="my-aside">
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            unique-opened
            router
          >
            <el-submenu v-for="(item,index) in menuList" :key="index" :index= "''+index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.authName}}</span>
              </template>
              <el-menu-item :index="menuItem.path" v-for="(menuItem,index) in item.children" :key="index">
                <i class="el-icon-menu"></i>
                <span slot="title">{{menuItem.authName}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="my-main">
          <router-view>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import {confirm} from 'element-ui'
// vue.prototype.$confirm = confirm
//导入请求
import { menus } from "../api/http";
export default {
  name: "index",
  data() {
    return{
      menuList: []
    }
  },
  methods: {
    //登出的方法
    logout() {
      console.log(this);
      this.$messageBox
        .confirm("是否确定退出", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          //退出成功后删除token
          window.localStorage.removeItem("token");
          //退回到登入页面
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "谢谢您的留下"
          });
        });
    },
    handleOpen() {},
    handleClose() {}
  },
  created() {
    menus().then(res => {
      // console.log(res);
      this.menuList = res.data.data
    });
  }
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  .my-con {
    height: 100%;
    .my-header {
      background-color: #b3c0d1;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 24px;
        color: #ffffff;
      }
      a {
        font-size: 16px;
        color: orange;
      }
    }
    .my-aside {
      background-color: #ffffff;
    }
    .my-main {
      background-color: #e9eef3;
    }
  }
}
</style>
