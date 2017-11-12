<template>
    <div class="comment">
        <h2 class="comment-header">发表评论</h2>
        <!-- maxlength控制文本域中输入内容的长度 -->
        <textarea cols="30" rows="5" placeholder="请输入评论内容，最多输入120字" maxlength="120" ></textarea>
        <mt-button type="primary" size="large" >发表评论</mt-button>
        <ul class="comment-content">
            <li class="comment-item" >
                <h3>
                    <span>第楼</span>
                    <span>用户：</span>
                    <span>发表时间：</span>
                </h3>
                <p></p>
            </li>
        </ul>

        <!-- plain 幽灵按钮（空心，只有边框） -->
        <mt-button type="primary" size="large" plain >加载更多</mt-button>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                //存储评论数据
                list:''
            }
        },
        methods:{
            getComment(){
                //设置请求接口参数
                //采用es6字符串模板方式来编写
                var url=`api/getcomments/${this.$route.params.id}?pageindex=1`;
                this.$http.get(url)
                    .then(res=>{
                        if(res.data.status===0){
                            this.data=res.data.message;
                        }
                    })
            }
        },
        create(){
            this.getComment();
        }
    }
</script>

<style lang="scss">
    .comment {
        border-top: 1px solid #ddd;
        padding: 10px;

    .comment-header {
        font-size: 22px;
    }

    .comment-content {
        list-style: none;
        margin: 0;
        padding: 0;

    .comment-item {

    h3 {
        font-weight: 500;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        background-color: #ddd;
        height: 26px;
        line-height: 26px;
    }

    p {
        padding-left: 10px;
        color: #000;
    }

    }
    }
    }

</style>