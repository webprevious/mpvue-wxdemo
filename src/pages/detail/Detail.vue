<template>
    <div>
        <BookInfo :info="info"></BookInfo>
        <CommentList :commentList="comments"></CommentList>
        <div class="comment" v-if="isShowAddComment">
            <textarea v-model="comment" class="textarea" :maxlength="100" placeholder="请输入图书短评"></textarea>
            <div class="location">
                地理位置
                <switch color="#EA5A49" @change="getGeo" :checked="location"></switch>
                <span class="text-primary">{{location}}</span>
            </div>
            <div class="phone">
                手机型号
                <switch color="#EA5A49" @change="getPhone" :checked="phone"></switch>
                <span class="text-primary">{{phone}}</span>
            </div>
            <button class="btn" @click="addComment">评论</button>
        </div>
        <div v-else class="text-footer">
            未登录或者已经评论过啦
        </div>
        <button open-type="share" class="btn">转发给好友</button>
    </div>
</template>

<script>
import utils from '../../utils.js'
import BookInfo from '@/components/BookInfo.vue'
import CommentList from '@/components/CommentList.vue'
export default{
    data () {
        return {
            bookid:'',
            info:{},
            comment:'',
            location:'',
            phone:'',
            userinfo:{},
            comments:[]
        }
    },
    methods: {
        async getDetail(){
            const info = await utils.get('/weapp/bookdetail',{id:this.bookid});
            this.info = info;
            wx.setNavigationBarTitle({
                title:info.title
            })
        },
        getGeo(e){
            const ak = "ulKmOpxD4BZTY0eoIR9e9jUdFD2ANo3G";
            let url = "http://api.map.baidu.com/geocoder/v2/"
            if(e.target.value){
                wx.getLocation({
                    success:geo=>{
                        console.log(geo)
                        wx.request({
                            url,
                            data:{
                                ak,
                                location:`${geo.latitude},${geo.longitude}`,
                                output:'json'
                            },
                            success:res=>{
                                if(res.data.status==0){
                                    this.location = res.data.result.addressComponent.city
                                }else{
                                    this.location = "未知地点"
                                    console.log("出错了")
                                }
                            }
                        })
                    }
                })
            }else{
                this.location = ''
            }
        },
        getPhone(e){
            //根据是否选中
            if(e.target.value){
                const phoneInfo = wx.getSystemInfoSync();
                this.phone = phoneInfo.model
            }else{
                this.phone = ''
            }
        },
        async addComment(){
            // 检验是否输入
            if(!this.comment){
                return
            }
            //收集评论内容，手机型号，地理位置，图书id，谁评论的openid
            const data = {
                openid:this.userinfo.openId,
                bookid:this.bookid,
                comment:this.comment,
                phone:this.phone,
                location:this.location
            }
            try{
                await utils.post('/weapp/addcomment',data)
                this.comment = ''
                this.getComment()
            }catch(err){
                wx.showModal({
                    title:"失败",
                    content:err.msg
                })
            }
        },
        async getComment(){
            console.log("getComment执行了")
            const comments = await utils.get('/weapp/commentlist',{bookid:this.bookid})
            this.comments = comments.list
            console.log("getComment执行了",this.comments)
        }
    },
    mounted () {
        this.bookid = this.$root.$mp.query.id;
        this.getDetail();
        this.getComment();
        const userinfo = wx.getStorageSync("userinfo");
        if(userinfo){
            this.userinfo = userinfo
        }
        console.log(this.userinfo)
        
    },
    components: {
        BookInfo,
        CommentList
    },
    onShareAppMessage: function () {
        
    },
    computed: {
        isShowAddComment(){
            //是否显示输入评论框，允许评论
            //未登录不显示
            if(!this.userinfo.openId){
                return false
            }
            //在评论中查到自己的openid说明已经评论过不能再次评论
            if(this.comments.filter(v=>v.openid==this.userinfo.openId).length){
                return false
            }

            return true
        }
    }
}
</script>

<style scoped lang="stylus">
.text-footer{
    text-align: center;
    font-size: 12px;
    margin-bottom: 5px;
}
.comment{
    margin-top: 10px;
    .textarea{
        width: 730rpx;
        height: 200rpx;
        background: #eee;
        padding: 10rpx;
    }
    .location{
        margin-top: 10px;
        padding: 5px 10px;
    }
    .phone{
        margin-top: 10px;
        padding: 5px 10px;
    }
}
</style>