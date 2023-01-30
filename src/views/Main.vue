<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <!-- Aside -->
        <SideBar />
      </el-aside>
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <Tag />
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";
import Tag from "@/components/Tag.vue";
export default {
  data() {
    return {};
  },
  components: {
    SideBar,
    Header,
    Tag
  }
};
</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
}
</style>