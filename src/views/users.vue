<template>
  <div>
    <!-- 自定义全局组件:面包屑 -->
    <bread first="用户管理" second="用户列表"></bread>
    <!-- 输入框搜索栏 -->
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入内容"
          class="input-with-select"
          v-model.trim="searchParams.query"
          @input="getUsers"
        >
          <el-button slot="append" icon="el-icon-search" @click="getUsers"></el-button>
        </el-input>
      </el-col>
      <el-col :span="18">
        <el-button type="success" plain @click="dialogFormVisible=true">添加用户</el-button>
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
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="showEdit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="showDelete(scope.row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-check"
            size="mini"
            plain
            @click="showRole(scope.row)"
          ></el-button>
        </template>
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

    <!-- 对话框页面 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="mail">
          <el-input v-model="form.mail" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户信息 -->
    <el-dialog title="收货地址" :visible.sync="editFormVisible">
      <el-form :model="editForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="mail">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doEdit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 删除用户的对话框 -->
    <el-dialog title="提示" :visible.sync="dialogDelete" width="30%">
      <div class="warning">
        <i class="el-icon-warning" color="orange"></i>
        <span>确定要删除该用户吗?</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelete = false">取 消</el-button>
        <el-button type="primary" @click="doDelete">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分配角色   -->
    <el-dialog title="分配角色" :visible.sync="dialogRole" width="30%">
      <el-form :model="roleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="roleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" :label-width="formLabelWidth">
          <el-select v-model="roleForm.rid" placeholder="请选择角色">
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRole = false">取 消</el-button>
        <el-button type="primary" @click="userChangeRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//导入请求用户列表的方法
import {
  users,
  addUser,
  changeUserState,
  editUser,
  deleteUser
} from "../api/http";
import { roles ,userRole} from "../api/roles.js";
export default {
  name: "users",
  data() {
    return {
      //编辑用户信息的列表
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },
      //角色列表
      roleList:[],
      roleForm: {
        name: "",
        //角色id
        rid: 0,
        //用户id
        id:0,
      },
      //控制分配角色对话框的显示
      dialogRole: false,
      //控制修改用户信息对话框的显示
      editFormVisible: false,
      //控制删除对话框的显示
      dialogDelete: false,
      //删除用户的id
      deleteId: null,
      //输入框输入的关键字
      searchWords: "",
      //查询用户列表的参数
      searchParams: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      tableData: [],
      //总条数
      total: null,

      //对话框属性
      // 表格宽度
      formLabelWidth: "100px",
      // 对话框是否显示
      dialogFormVisible: false,
      //表单属性
      form: {
        username: "",
        password: "",
        mail: "",
        mobile: ""
      },
      //验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 11,
            message: "长度在 5 到 11 个字符",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 8,
            message: "长度在 6 到 8 个字符",
            trigger: ["blur", "change"]
          }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱格式",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入11位手机",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    //封装获取用户列表的方法
    getUsers() {
      //如果query值不为空 表示要查数据 将pagenum的值改为1
      if (this.searchParams.query != "") {
        this.searchParams.pagenum = 1;
      }
      //执行用户列表的请求
      users(this.searchParams).then(res => {
        // console.log(res);
        // 将获取的值赋值给tableData
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },
    //获取角色列表
    getRoles() {
      roles().then(res => {
        // console.log(res)
        this.roleList = res.data.data;
        // console.log(this.roleList);
      });
    },

    //弹出分配角色对话框
    showRole(row) {
      // console.log(row)
      this.dialogRole = true;
      this.roleForm.name = row.username;
      //有问题,传参的rid 是数字,如果下拉框不改变,传的值是文字,所以要循环判断之后再赋值
      // this.roleForm.rid = row.role_name;
      let rid = 0;
      for(let i =0 ;i<this.roleList.length;i++){
        // 当循环角色列表中的角色名 与点击行的角色名相同时 取出id 赋值
        if(this.roleList[i].roleName == row.role_name){
          rid = this.roleList[i].id
          break;
        }
      }
      this.roleForm.rid = rid
      this.roleForm.id = row.id;
    },
    //分配角色执行
    userChangeRole(){
      userRole(this.roleForm).then(res=>{
        console.log(res)
        if(res.data.meta.status == 200){
          this.dialogRole = false;
          this.$message.success(res.data.meta.msg);
          this.getUsers();
        }else{
          this.$message.error("设置失败")
        }
      })
    },
    //弹出删除用户对话框
    showDelete(val) {
      this.dialogDelete = true;
      // console.log(val)
      this.deleteId = val.id;
    },
    //执行删除信息
    doDelete() {
      // alert(123)
      deleteUser(this.deleteId).then(res => {
        // console.log(res)
        if (res.data.meta.status == 200) {
          this.$message.success(res.data.meta.msg);
          this.dialogDelete = false;
          this.getUsers();
        } else {
          this.$message.error("删除失败,请联系管理员");
        }
      });
    },

    //弹出修改用户信息对话框
    showEdit(val) {
      this.editFormVisible = true;
      // this.editForm = val;
      //使用解构语法，可以使引用对象
      // 将获取的点击行的信息显示在输入框中
      this.editForm = { ...val };
    },
    // 修改用户信息
    doEdit() {
      editUser(this.editForm).then(res => {
        // console.log(res)
        this.form = { ...res.data.data };
        // this.form.mobile = res.data.data.mobile
        this.editFormVisible = false;
        this.$message.success("修改成功");
        this.getUsers();
      });
    },
    //添加用户状态改变的方法
    changeState(val) {
      // val包含了点击的那一整行的信息
      // console.log(val)
      changeUserState(val.id, val.mg_state).then(res => {
        console.log(res);
        if (res.data.meta.status == 200) {
          this.$message.success(res.data.meta.msg);
        } else {
          this.$message.error("修改状态失败，请联系管理员");
        }
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
      this.getUsers();
    },

    //当前页码数
    handleCurrentChange(page) {
      this.searchParams.pagenum = page;
      //再次执行获取用户列表的方法
      this.getUsers();
    },
    // 确定添加后会验证所有规则
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //对话框隐藏
          this.dialogFormVisible = false;

          addUser(this.form).then(res => {
            console.log(res);
            if (res.data.meta.status == 201) {
              //提示添加成功
              this.$message.success("添加成功");
              //刷新页面
              this.getUsers();
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
          //清空表格数据
          this.$refs[formName].resetFields();
        }
      });
    }
  },
  created() {
    //获取用户列表
    this.getUsers();
    //获取角色列表
    this.getRoles();
  }
};
</script>

<style lang="less" scoped>
.my-bread {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
}
.warning {
  height: 32px;
  line-height: 32px;
  font-size: 20px;
  display: flex;
  align-items: center;

  .el-icon-warning {
    color: #e6a23c;
    margin-right: 5px;
  }
}
</style>
