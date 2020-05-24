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
      <el-col :span="8">
        <el-input placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="16">
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

    <div class="block">
      <el-pagination
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
      //查询用户列表的参数
      searchParams: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      tableData: [],
      //表头
      formHeader: []
    };
  },
  created() {
    //执行用户列表的请求
    users(this.searchParams).then(res => {
      console.log(res);
      // 将获取的值赋值给tableData
      this.tableData = res.data.data.users;
    });
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
