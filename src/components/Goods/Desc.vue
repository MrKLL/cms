<template>
    <div class="goods-desc">
        <h2 v-text="desc.title"></h2>
        <div class="details-content" v-html="desc.content"></div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                //存储获取的商品详情数据
                desc:{}
            }
        },
        methods:{
            //通过商品id获取详情介绍
            getDesc(){
                //设置请求数据的接口地址
                var url=`api/goods/getdesc/${this.$route.params.id}`;
                //通过axios发送get请求,并接收返回数据
                this.$http.get(url)
                    .then(res=>{
                        if(res.data.status===0){
                            //获取数据成功,将数据保存,以便在模板中展示数据
                            //注意:此处返回数据为一条json数据,但是是以数组的形式进行返回的,所以需要保存第一条
                            this.desc=res.data.message[0];
                            console.log(this.content)
                        }
                    })
            }
        },
        created(){
            this.getDesc();
        }

    }
</script>

<style lang="scss">
    .goods-desc {
    h2 {
        font-size: 20px;
        text-align: center;
        color: #26a2ff;
        padding: 10px 0;
    }

    .details-content {
        border-top: 1px solid #ccc;
        margin: 10px 4px 0 4px;
        padding-top: 10px;

    table {
        width: 100%
    }
    }

    img {
        width: 100%;
        display: block;
    }
    }
</style>
