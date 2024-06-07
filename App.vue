<template>
  <div>
   <!-- 路由匹配到的组件将渲染在这里 -->
   <!-- 主路由出口 -->
  <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
 
};
</script>

<style lang="less">
html,body,h3,p{
  margin: 0;
  padding: 0;
}
</style>
