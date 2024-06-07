import Cookie from 'js-cookie'
export default{
    state:{
        isCollapse: false,//定义菜单展开还是收起
        tabsList:[
            {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home"
            }
        ],//面包屑数据
        menu:[]
    },
    // 定义方法
    mutations:{
        collapseMenu(state){
            state.isCollapse=!state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state,val){
            // 判断添加的数据是否为首页
            if(val.name!=="home"){
                // 判断数据是否在tabsList中已存在，不存在则添加进tabsList
                const index=state.tabsList.findIndex(item=>item.name===val.name);//不存在时indedx=-1
                if(index===-1){
                    state.tabsList.push(val);
                }
            }

        },
        closeTag(state,item){
            const index=state.tabsList.findIndex(val=>val.name===item.name);
            // 删除操作
            state.tabsList.splice(index,1)//arr.splice(删除的位置，要删除的个数)
        },
        // 设置menu数据
        setMenu(state,val){
            state.menu=val
            // 将菜单数据缓存
            Cookie.set('menu',JSON.stringify(val))
        },
        // 动态添加路由
        addMenu(state,router){
            // 判断Cookie中的menu是否存在
            if(!Cookie.get('menu')) return
            const menu=JSON.parse(Cookie.get('menu'))
            state.menu=menu
            // 组装动态路由数据
            const menuArray=[]
            menu.forEach(item => {
                // 判断是否有子菜单
                if(item.children){//有子菜单
                    // 继续遍历子菜单
                    item.children=item.children.map(item=>{
                        item.component=()=>import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                }else{
                    item.component=()=>import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            console.log('menuArray',menuArray);
            // 动态添加路由
            menuArray.forEach(item=>{
                router.addRoute('Main',item)
            })
        }
    }
}