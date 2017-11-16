<template>
  <div>
      <!-- 使用 mintui 的header组件 -->
      <mt-header fixed title="Vue项目">
          <a href="#/" slot="left" @click.prevent="goBack" v-if="isShow">
              <mt-button icon="back">返回</mt-button>
          </a>
      </mt-header>
      <!--内容区域-->
      <!--设置一个类名,通过此类名设置内容区域的共同样式,此类名会被展示的元素标签继承-->
      <router-view class="content" @getCart="getCart"></router-view>

      <!--使用MUI库footer功能-->
      <nav class="mui-bar mui-bar-tab">
          <router-link class="mui-tab-item " to="/home">
              <span class="mui-icon mui-icon-home"></span>
              <span class="mui-tab-label">首页</span>
          </router-link>
          <router-link class="mui-tab-item" to="/vip">
              <span class="mui-icon mui-icon-contact"></span>
              <span class="mui-tab-label">会员</span>
          </router-link>
          <router-link class="mui-tab-item" to="/cart">
              <!-- 注意：mui-icon 必须要有，否则，样式错乱 -->
              <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                  <span class="mui-badge">{{count}}</span>
              </span>
              <span class="mui-tab-label">购物车</span>
          </router-link>
          <router-link class="mui-tab-item" to="/search">
              <span class="mui-icon mui-icon-search"></span>
              <span class="mui-tab-label">搜索</span>
          </router-link>
      </nav>
  </div>
</template>

<script>
  // 因为只有在 App.vue 组件中使用了 icon-extra 样式，所以，只需要在
  // 这个组件中导入样式即可！
  import './lib/mui/css/icons-extra.css';
  // 注意导出的这个对象就是：当前组件的配置对象
    export default{
        data(){
            return {
                //默认不展示返回键
                isShow:false,
                //接收子组件传递过来的存储购物中商品的数量
                count:0,
                //保存商品id和商品数量的对应关系
                id2num:[]
            }
        },
        watch:{
            //监视路由的变化
            '$route'(to,from){
                if(to.path !== '/home'){
                    //不是首页,就显示返回键
                    this.isShow=true;
                }else{
                    this.isShow=false;
                }
            }
        },
        created(){
          //每次刷新页面都检查,是不是首页
            if(this.$route.path !== '/home') {
                this.isShow = true
            }
        },
        methods:
            {
                //实现返回上一层功能
                goBack(){
                    this.$router.go(-1);
                },
                //注册方法供子组件传输数据过来
                getCart(data){
                    //用list变量对传递过来的数据进行格式化处理
                    var list={};
                    list.id=data[0];
                    list.count=data[1];
                    //存储所有商品的总数量
                    this.count+=data[1]-0
                    //将处理好的数据储存到data中的id2num中
                    this.id2num.push(list);
//                    console.log(this.id2num);
                }
            }
    }
</script>

<style lang="scss" scoped>
/* 在style标签上加上lang="scss" 可以在里面写scss语法*/

    .content
    {
    margin:40px 0 50px 0;
    }
    .mui-bar .mui-bar-tab {
        .mui-active
        {
            color:#007aff;
        }
    }



</style>

