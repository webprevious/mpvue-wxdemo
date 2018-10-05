<template>
    <div class="bookinfo">
        <div class="thumb">
            <img :src="info.image" mode="aspectFill" class="back">
            <img :src="info.image" class="img" mode="aspectFit">
            <div class="info">
                <div class="title">{{info.title}}</div>
                <div class="author">{{info.author}}</div>
            </div>
        </div>
        <div class="detail">
            <img :src="userinfo.image" alt="" class="avatar" mode="aspectFit">
            {{userinfo.name}}
            <div class="right text-primary">
                {{info.rate}}分
                <Rate :value="info.rate"></Rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" :key="tag" v-for="tag in info.tag">{{tag}}</div>
        </div>
        <div class="summary">
            <p :key="i" v-for="(sum,i) in info.summary">{{sum}}</p>
        </div>
    </div>
</template>

<script>
import Rate from './Rate.vue'
export default{
    props: ["info"],
    computed: {
        userinfo(){
            return this.info.user_info||{}
        }
    },
    components: {
        Rate
    }
}
</script>

<style scoped lang="stylus">
.bookinfo{
    .badge{
        display: inline-block;
        margin:5px;
        padding:5px;
        border-radius:10px;
        border:1px solid #EA5A49;
        color:#EA5A49;
    }
    .summary{
        padding: 10px;
        margin-top: 10px;
        p{
            text-indent:2em;
        }
    }
    font-size: 14px;
    .right{
        float: right;
    }
    .detail{
        padding: 5px 10px;
        .avatar{
            width: 20px;
            height: 20px;
            border-radius:50%;
            vertical-align:middle;
        }
    }
    .thumb{
        width: 750rpx;
        height: 500rpx;
        overflow: hidden;
        position: relative;
        .back{
            filter: blur(15px);
            width: 100%;
        }
        .img{
            position: absolute;
            width: 100%;
            height: 300rpx;
            left: 0;
            top: 30rpx
        }
        .info{
            color: white;
            position: absolute;
            width: 100%;
            left: 0;
            top: 330rpx;
            text-align: center;
            .title{
                font-size: 20rpx;
            }
            .author{
                font-size: 14rpx;
            }
        }
    }
}
</style>