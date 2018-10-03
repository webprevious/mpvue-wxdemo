<template>
    <div class="book-card">
        <div class="thumb">
            <img :src="book.image" class="image" mode="scaleToFill">
        </div>
        <div class="detail">
            <div class="row">
                <div class="right">
                    {{book.rate}}<Rate :value="book.rate"></Rate>
                </div>
                <div class="left">
                    {{book.title}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    浏览量：
                </div>
                <div class="left">
                    {{book.author}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    添加人：
                </div>
                <div class="left">
                    {{book.publisher}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Rate from 'vue-tiny-rate';
export default{
    props: ['book'],
    components: {
        Rate
    }
}
</script>

<style lang="stylus" scoped>
.book-card{
    padding: 5rpx;
    overflow: hidden;
    margin-top: 5rpx;
    margin-bottom: 5rpx;
    font-size: 22rpx;
    .thumb{
        width: 120rpx;
        height: 120rpx;
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
            line-height: 40rpx;
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