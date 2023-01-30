<template>
  <div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
    >
      <h3>{{isCollapse ? '后台' : "后台管理系统"}}</h3>
      <el-menu-item v-for="item in noChildren" :key="item" :index="item" @click="clickItem(item)">
        <el-icon>
          <!-- $icon[item.icon] -->
          <component :is="item.icon"></component>
        </el-icon>
        <template #title>{{item.label}}</template>
      </el-menu-item>
      <el-sub-menu v-for="item in hasChildren" :key="item" :index="item.path">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item-group
          v-for="subItem in item.children"
          :key="subItem"
          @click="clickItem(subItem)"
        >
          <!-- <template #title>
            <span>Group One</span>
          </template>-->
          <el-menu-item :index="subItem.path">{{subItem.label}}</el-menu-item>
          <!-- <el-menu-item index="1-2">item two</el-menu-item> -->
        </el-menu-item-group>
        <!-- <el-menu-item-group title="Group Two"> -->
        <!-- <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>-->
        <!-- <el-sub-menu index="1-4">
          <template #title>
            <span>item four</span>
          </template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>-->
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
// import { ref } from "vue";
// import {
//   Document,
//   Menu as IconMenu,
//   Location,
//   House,
//   Setting
// } from "@element-plus/icons-vue";
import Cookie from "js-cookie";
export default {
  // const isCollapse = ref(false);
  // const handleOpen = (key: string, keyPath: string[]) => {
  //   console.log(key, keyPath);
  // };
  // const handleClose = (key: string, keyPath: string[]) => {
  //   console.log(key, keyPath);
  // };
  data() {
    return {
      // isCollapse: false,
      // menuData: [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "House",
      //     url: "Home/Home"
      //   },
      //   {
      //     path: "/mall",
      //     name: "mall",
      //     label: "商品管理",
      //     icon: "ShoppingCart",
      //     url: "MallManage/MallManage"
      //   },
      //   {
      //     path: "/user",
      //     name: "user",
      //     label: "用户管理",
      //     icon: "User",
      //     url: "UserManage/UserManage"
      //   },
      //   {
      //     label: "其他",
      //     icon: "Setting",
      //     children: [
      //       {
      //         path: "/page1",
      //         name: "page1",
      //         label: "页面1",
      //         icon: "Setting",
      //         url: "Other/PageOne"
      //       },
      //       {
      //         path: "/page2",
      //         name: "page2",
      //         label: "页面2",
      //         icon: "Setting",
      //         url: "Other/PageTwo"
      //       }
      //     ]
      //   }
      // ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickItem(item) {
      this.$router.push(item.path);
      this.$store.commit("updateBreadcrumb", item);
    }
  },
  computed: {
    // 没有子菜单
    noChildren() {
      return this.menuData.filter(item => !item.children);
    },
    // 有子菜单
    hasChildren() {
      return this.menuData.filter(item => item.children);
    },
    menuData() {
      console.log(Cookie.get("menu"));
      return JSON.parse(Cookie.get("menu")) || this.$store.state.tab.menu;
    },
    isCollapse() {
      console.log(this.$store.state.tab.isCollapse);
      return this.$store.state.tab.isCollapse;
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;
  h3 {
    margin: 0;
    padding: 20px 0;
    color: #fff;
    text-align: center;
  }
}
</style>
