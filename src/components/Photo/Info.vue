<template>
    <div class="photo-info">
        <header>
            <h2 class="title">{{ list.title }}</h2>
            <p class="mui-ellipsis">
                <span>发表时间：{{ list.add_time }}</span>
                <span>点击次数：{{ list.click }}次</span>
            </p>
        </header>

        <div class="thumb-img">
            <img class="preview-img" v-for="(item,index) in images" :key="index" :src="item.src" height="100" @click="$preview.open(index, images)">
        </div>
        <div class="content" v-html="list.content"></div>

        <!-- 评论组件 -->
        <Comment :commentId="$route.params.id"></Comment>
    </div>
</template>

<script>
    //导入评论组件
    import Comment from '../Comment/Comment.vue'
    //引入comment组件
    export default{
        data(){
            return {
                //存储图片详情数据
                list:[],
                //存储图片缩略图信息
                images:[]
            }
        },
        methods:{
            //获取指定id的图片详情数据
            getImgInfo(id){
                //设置请求数据的接口地址
                var url=`/api/getimageInfo/${id}`;
                //通过axios发送get请求,并接收返回数据
                this.$http.get(url)
                    .then(res=>{
                        if(res.data.status===0){
                            //获取数据成功,将数据保存,以便在模板中展示数据
                            //注意:此处返回数据为一条json数据,但是是以数组的形式进行返回的,所以需要保存第一条
                            this.list=res.data.message[0];
                        }
                    })

            },
            //获取指定id的图片的缩略图信息
            getThumbImg(id){
                //设置请求数据的接口地址
                var url=`/api/getthumimages/${id}`;
                //通过axios发送get请求,并接收返回数据
                this.$http.get(url)
                    .then(res=>{
                        if(res.data.status===0){
                            //获取数据成功,将数据保存,以便在模板中展示数据
                            this.images=res.data.message;
                            //实现缩略图点击出现大图功能使用vue插件vue-preview
                            // 因为 vue-preview 插件，需要用到 w 和h属性，所以，我们遍历所有的数据
                            // 给每一项添加 w 和 h 属性
                            this.images.forEach(arr=>{
                                arr.w=600;
                                arr.h=400
                            });
                        }
                    })
            }
        },
        created(){
            //调用方法获取图片详情
            this.getImgInfo(this.$route.params.id);
            this.getThumbImg(this.$route.params.id)
        },
        components:{
            Comment
        }
    }

</script>

<style lang="scss" scoped>
    .photo-info {
        padding-left: 3px;
        padding-right: 3px;

    .thumb-img {
        border-top: 1px solid #ccc;

    img {
        margin: 8px;
        box-shadow: 0 0 15px #ccc;
    }
    }

    header {
        padding-top: 5px;
    }

    .title {
        font-size: 18px;
        color: #26a2ff;
        text-align: center;
    }

    .mui-ellipsis {
        display: flex;
        justify-content: space-between;
        padding: 0 3px;
    }

    .content {
        font-size: 14px;
        line-height: 28px;
        padding-top: 20px;
    }
    }
</style>