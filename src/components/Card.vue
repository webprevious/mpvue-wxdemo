<template>
<a :href="detailUrl">
    <div class="book-card">
        <div class="thumb" @click.stop="preview">
            <img :src="book.image" class="image" mode="scaleToFill">
        </div>
        <div class="detail">
            <div class="row text-primary">
                <div class="right">
                    {{book.rate}}<Rate :value="book.rate"></Rate>
                </div>
                <div class="left">
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    浏览量：{{book.count}}
                </div>
                <div class="left">
                    {{book.author}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    {{book.user_info.nickName}}
                </div>
                <div class="left">
                    {{book.publisher}}
                </div>
            </div>
        </div>
    </div>
</a>
</template>

<script>
import Rate from './Rate.vue'
export default{
    props: ['book'],
    components: {
        Rate
    },
    computed: {
        detailUrl(){
            return '/pages/detail/main?id='+this.book.id
        }
    },
    methods: {
        preview(){
            wx.previewImage({
                current:this.book.image,
                urls:[this.book.image]
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.book-card{
    height: 180rpx;
    padding: 5rpx;
    overflow: hidden;
    margin-top: 5rpx;
    margin-bottom: 5rpx;
    font-size: 22rpx;
    .thumb{
        width: 120rpx;
        height: 160rpx;
        float: left;
        margin: 0 auto;
        overflow: hidden;
        .image{
            max-width: 100%;
            max-height: 100%;
        }
    }
    .detail{
        margin-left: 140rpx;
        .row{
            line-height: 60rpx;
        }
        .right{
            float: right;
        }
        .left{
            margin-right: 80rpx;
        }
    }
}
</style>