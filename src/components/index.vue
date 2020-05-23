<template>
  <div class="index">
    <el-container class="my-con">
      <el-header class="my-header">
        <img src="../assets/img/logo.png"
             alt="">
        <h2>电商后台管理系统</h2>
        <!-- 要记得阻止冒泡 -->
        <a href="#" @click.prevent="logout">退出</a>
      </el-header>
      <el-container>
        <el-aside width="200px"
                  class="my-aside">Aside</el-aside>
        <el-main class="my-main"></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import {confirm} from 'element-ui'
// vue.prototype.$confirm = confirm
export default {
  methods: {
      logout() {
        console.log(this)
        this.$messageBox.confirm('是否确定退出', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          //退出成功后删除token
          window.localStorage.removeItem('token')
          //退回到登入页面
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '谢谢您的留下'
          });          
        });
      }
    }
  }


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