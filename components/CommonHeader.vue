<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px;" icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
      
      <!-- 顶部面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img src="../images/user.png" class="user">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancel">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Cookie from 'js-cookie'
export default {
  data() {
    return {};
  },
  methods:{
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    handleClick(command){
      if(command==='cancel'){
        // 清除token
        Cookie.remove('token')
        // 清除cookie中的menu
        Cookie.remove('menu')
        // 跳转回登录页面
        this.$router.push('/login')

      }
    }
  },
  // 用辅助函数获取store中的state
  computed:{
    ...mapState({
      tags:state=>state.tab.tabsList//获取的tags就是state中的tabsList数组
    })
  }
};
</script>
<style lang="less" scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  .text {
    color: #fff;
    margin-left: 10px;
    font-size: 14px;
  }
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .l-content{
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item{//样式穿刺
      .el-breadcrumb__inner{
        &.is-link{
          color: #666;
        }
      } 
      &:last-child{
        .el-breadcrumb__inner{
          color: #fff;
        }
      }
    }
  }
}
</style>