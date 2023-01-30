<template>
  <div>
    <el-tag
      v-for="(item,index) in tabList"
      :key="item.path"
      :closable="item.name != 'home'"
      :effect="$route.name == item.name ? 'dark' : 'plain'"
      @click="changeTab(item)"
      @close="handleClose(item,index)"
    >{{item.label}}</el-tag>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "tag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tabList: state => state.tab.tabList
    })
  },
  mounted() {
    console.log(this.$route, this.tabList);
  },
  methods: {
    ...mapMutations(["closeTag"]),
    changeTab(item) {
      console.log(item);
      this.$router.push({ name: item.name });
    },
    handleClose(item, index) {
      this.closeTag(item);
      const length = this.tabList.length;
      console.log(index);
      //   如果删除的不是当前这项不做任何操作（是指跳转路径不做任何操作）
      //   if (item.name != this.$router.name) {
      //     return;
      //   }
      //   点击之后length会-1
      //   删除的是最后一项
      if (index == length) {
        this.$router.push({ name: this.tabList[index - 1].name });
      }
      //   删除中间的向右边tag切
      else {
        console.log(index);
        this.$router.push({ name: this.tabList[index].name });
      }
    }
  }
};
</script>