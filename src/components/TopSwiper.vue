<template>
    <div class="swiper">
        <swiper :indicator-dots="isShowDots" indicator-active-color="#EA5A49"
            :autoplay="isAutoplay" :interval="interval" :duration="duration" :circular="circular">
            <block v-for="(items,index) in topImgs" :key="index">
              <swiper-item>
                <image @click="bookDetail(item)" :src="item.image" class="slide-image" v-for="(item,key) in items" :key="key" style="width:200rpx;margin:0 25rpx;"/>
              </swiper-item>
            </block>
         </swiper>
    </div>
</template>

<script>
export default{
    data () {
        return {
            isShowDots:true,
            isAutoplay:true,
            interval:3000,
            duration:500,
            circular:true
        }
    },
    props: {
        tops:{
            type:Array,
            default:[]
        }
    },
    computed: {
        topImgs(){
            return [this.tops.slice(0,3),this.tops.slice(3,6),this.tops.slice(6,9)]
        }
    },
    methods: {
        bookDetail(item){
            wx.navigateTo({
                url:"/pages/detail/main?id="+item.id
            })
        }
    }
}
</script>

<style scoped>

</style>