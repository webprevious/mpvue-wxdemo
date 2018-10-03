<template>
    <div class="rate">
        <!-- <span>☆☆☆☆☆</span>
        <div class="hollow" :style="style">★★★★★</div> -->
        <Rate value="1"></Rate>
    </div>
</template>

<script>
import Rate from 'vue-tiny-rate';
export default{
    props: {
        value:{
            type:[String,Number],
            default:"0"
        }
    },
    // computed: {
    //     style(){
    //         return `width:${this.value/2-0.7}em`
    //     }
    // }
    components: {
        Rate
    }
}
</script>

<style scoped>
/* .rate{
    position: relative;
    display: inline-block;
    .hollow{
        position: absolute;
        display:inline-block;
        top:0;
        left:0;
        width:0;
        overflow: hidden;
    }
} */
</style>