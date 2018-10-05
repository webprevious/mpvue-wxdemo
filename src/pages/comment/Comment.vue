<template>
    <div class="container">
        <CommentList :commentList="comments" type="user" v-if="userinfo.openId"></CommentList>
        <div v-if="userinfo.openId">
            <div class="page-title">我的图书</div>
            <Card v-for="book in books" :key="book.id" :book="book"></Card>
            <div v-if="!books.length">暂时还没添加图书，快去添加吧</div>
        </div>
    </div>  
</template>

<script>
    import CommentList from '@/components/CommentList.vue'
    import Card from '@/components/Card.vue'
    import utils from '../../utils.js'
    export default{
        created () {
            console.log("评论页面启动");
        },
        data () {
            return {
                comments:[],
                userinfo:{},
                books:[]
            }
        },
        methods: {
            async getComments(){
                const comment = await utils.get('/weapp/commentlist',{openid:this.userinfo.openId});
                this.comments = comment.list;
            },
            init(){
                wx.showNavigationBarLoading()
                this.getComments()
                this.getBook()
                wx.hideNavigationBarLoading()
            },
            async getBook(){
                const books = await utils.get('/weapp/booklist',{
                    openid:this.userinfo.openId
                })
                this.books = books.list
            }
        },
        onShow () {
            if(!this.userinfo.openId){
                const userinfo = wx.getStorageSync("userinfo");
                if(userinfo){
                    this.userinfo = userinfo
                    this.init()
                }
            }
        },
        onPullDownRefresh(){
            this.init()
            wx.stopPullDownRefresh()
        },
        components: {
            CommentList,
            Card
        }
    }
</script>

<style>

</style>