<template>
  <div class="header-container">
    <div class="left">
      <el-button color="#73767a" icon="DArrowLeft" @click="isSideShow" />
      <!-- <el-icon>
        <House />
      </el-icon>-->
      <!-- breadcrumb display -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tab"
          :key="item.path"
          :to="{ path: item.path }"
        >{{item.label}}</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>
          <a href="/">promotion management</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>-->
      </el-breadcrumb>
      <!-- <span>首页</span> -->
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <!-- <el-button type="primary">
          Dropdown List
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>-->
        <el-avatar
          :size="50"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  methods: {
    isSideShow() {
      this.$store.commit("updateCollapse");
      console.log(this.$store.state);
    },
    handleCommand(command) {
      if (command === "exit") {
        Cookie.remove("token");
        Cookie.remove("menu");
        this.$router.push("/login");
      }
    }
  },
  computed: {
    tab() {
      console.log(this.$store.state.tab.tabList);
      return this.$store.state.tab.tabList;
    }
  }
};
</script>
<style lang="less" scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
.header-container {
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  .left {
    display: flex;
    align-items: center;
    color: #fff;
    // line-height: 60px;
    span {
      margin-left: 10px;
      //   font-size: 14px;
    }
    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        &.is-link {
          color: #666;
        }
      }
      &:last-child {
        .el-breadcrumb__inner {
          &.is-link {
            color: #fff;
          }
        }
      }
    }
  }
}
</style>