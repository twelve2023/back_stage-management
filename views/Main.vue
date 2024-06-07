<template>
  <div>
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="auto">
       <CommonAside/>
      </el-aside>
      <el-container>
          <!-- header部分 -->
        <el-header>
          <CommonHeader/>
        </el-header>
        <CommonTag/>
        <!-- main部分 -->
        <el-main>
          <!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHeader from '../components/CommonHeader.vue'
import CommonTag from '../components/CommonTag.vue'
export default {
  data() {
    return {};
  },
  components:{
    CommonAside,
    CommonHeader,
    CommonTag
  }
  
};
</script>
<style lang="less" scoped>
.el-header{
  padding: 0;
}

</style>