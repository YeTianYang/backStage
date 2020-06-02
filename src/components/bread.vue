<template>
  <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{first}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    props:["first","second"]
}
</script>

<style lang="less" scoped>
.my-bread {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
}
</style>