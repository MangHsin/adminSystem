<template>
  <div>
    <el-form
      :inline="true"
      class="login-container"
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="login-button">
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import { getMenu } from "../api/";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ trigger: "blur", message: "请输入用户名" }],
        password: [{ trigger: "blur", message: "请输入用户名" }]
      }
    };
  },
  methods: {
    submit() {
      //   const token = Mock.Random.guid();
      //   Cookie.set("token", token);
      //   this.$router.push("/home");
      this.$refs.form.validate(valid => {
        if (valid) {
          // 后续对表单的处理
          getMenu(this.form).then(({ data }) => {
            console.log(data);
            if (data.code === 20000) {
              Cookie.set("token", data.data.token);
              this.$store.commit("updateMenu", data.data.menu);
                            // this.$store.commit("addMenu", this.$router);

              this.$router.push("/home");
            } else {
              ElMessage.error("密码错误");
            }
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login-container {
  width: 350px;
  margin: 180px auto;
  border: 1px solid #eaeaea;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  .login-title {
    text-align: center;
    margin-bottom: 20px;
  }
  .login-button {
    margin-left: 144px;
  }
}
</style>