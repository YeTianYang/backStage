<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框搜索栏 -->
    <el-row>
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select" v-model.trim="searchParams.query" @input="getUsers">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="18">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="name" label="用户状态">
        <!-- table表格中要想使用组件，得使用自定义模板 -->
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作">
        <el-button type="primary" icon="el-icon-edit" size="mini" plain></el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" plain></el-button>
        <el-button type="warning" icon="el-icon-check" size="mini" plain></el-button>
      </el-table-column>
    </el-table>

    <!-- 分页部分 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
//导入请求用户列表的方法
import { users } from "../api/http";
export default {
  name: "users",
  data() {
    return {
      //输入框输入的关键字
      searchWords:'',
      //查询用户列表的参数
      searchParams: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      tableData: [],
      //总条数
      total: null
    };
  },
  methods: {
    //封装获取用户列表的方法
    getUsers() {
      //执行用户列表的请求
      users(this.searchParams).then(res => {
        console.log(res);
        // 将获取的值赋值给tableData
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },

    // //搜索关键字的方法
    // handleSearch(){
    //   // 用原生方法keyup.enter 时需后面接上native
    //   //获取输入框输入的值赋值给query
    //   this.searchParams.query = this.searchWords
    //   this.searchParams.pagenum = 1;
    //   //重新调用获取列表的方法获取数据再渲染
    //   this.getUsers()
    // },

    //每页条数的改变事件
    handleSizeChange(page) {
      this.searchParams.pagesize = page;
      //从新发送请求获得用户列表
      this.getUsers()
    },

    //当前页码数
    handleCurrentChange(page){
      this.searchParams.pagenum = page
      //再次执行获取用户列表的方法
      this.getUsers()
    },
  },
  created() {
    this.getUsers()
  }
};
</script>

<style lang="less" scoped>
.my-bread {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
}
</style>
