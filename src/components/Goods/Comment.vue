<template>
    <Comment :commentId="$route.params.id"></Comment>
</template>

<script>
    // 这个商品评论组件中，就是只展示完整的 评论组件 功能
    // 所以，需要导入 评论组件
    import Comment from '../Common/Comment.vue'

    export default {
        components: {
            Comment
        }
    }
</script>

<style>

</style>
