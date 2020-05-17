<template>
  <div class="login">
    <div class="box">
      <h2>用户登录</h2>
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm"
               :label-position="labelPosition">
        <el-form-item label="用户名"
                      prop="username">
          <el-input type="password"
                    v-model="ruleForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
                     class="loginBtn"
                     @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//导入请求
import { login } from '../api/http'
export default {
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'change' }
        ]
      },
      labelPosition: 'top'
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit')
          //发送请求，登入
          login(this.ruleForm.username, this.ruleForm.password)
            //当前函数的调用 会返回一个对象，可以使用链式语法
            //链式写法原理：是因为返回的都是当前的对象
            .then(res => {
              console.log(res)
            })
        } else {
          console.log('err submit')
          return false
        }
      }
      )
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;

  .box {
    width: 580px;
    height: 437px;
    padding: 40px;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 10px;
    h2 {
      font-size: 1.5em;
    }
    .loginBtn {
      width: 100%;
    }
  }
}
</style>