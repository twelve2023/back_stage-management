<template>
    <div class="tabs">
        <el-tag v-for="(item,index) in tags" 
        :key="item.path" 
        :closable="item.name!=='home'" 
        :effect="$route.name===item.name?'dark':'plain'" 
        @click="changeMenu(item)"
        @close="handleClose(item,index)"
        size="small">
            {{ item.label }}
        </el-tag>
    </div>
</template>
<script>
import { mapState,mapMutations } from 'vuex';
export default{
    name:'CommonTag',
    data(){
        return{}
    },
    computed:{
        ...mapState({
            tags:state=>state.tab.tabsList
        })
    },
   
    methods:{
        ...mapMutations(['closeTag']),//相当于把store中的mutations放到了当前页面
        //点击tag跳转功能
        changeMenu(item){
            this.$router.push({name:item.name})
        },
        // 点击tag删除功能
        handleClose(item,index){
            // 调用stoe中的mutations
            this.closeTag(item)
            const length=this.tags.length
            // 删除之后的跳转功能
            if(item.name!==this.$route.name){
                return
            }
            if(index===length){
                this.$router.push({
                    name: this.tags[index-1].name
                })
              
            } else{
                this.$router.push({
                    name: this.tags[index].name
                })
               
               
            }
          

        }
    }
}
</script>
<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag{
        margin-right: 10px;
        cursor: pointer;
    }

}
    
</style>