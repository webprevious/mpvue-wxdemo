<template>
    <div class="progressbar">
        <progress :percent="percent" color="#ea5a49" />
        <div class="text">{{year}}已经过去{{days}}天</div>
    </div>
</template>

<script>
export default{
    methods: {
        isLeapYear(){
            //闰年366和平年365
            const year = new Date().getFullYear();
            if(year%400===0){
                return true
            }else if(year%4&&year%100!==0){
                return true
            }else{
                return false
            }
        },
        getDayOfYear(){
            return this.isLeapYear()?366:365
        }

    },
    computed: {
        year(){
            return new Date().getFullYear()
        },
        days(){
            let start = new Date();
            start.setMonth(0)
            start.setDate(1)
            //start就是今年的第一天
            //今天的时间戳减去今年第一天的时间戳就可以知道过去了多少天
            let offset = new Date().getTime() - start.getTime();
            return parseInt(offset/1000/60/60/24) + 1
        },
        percent(){
            return (this.days*100/this.getDayOfYear()).toFixed(1);
        }
    }
}
</script>

<style scoped>
.progressbar{
    padding: 30rpx 40rpx;
    text-align: center;
}
.text{
    margin-top: 20rpx;
}
</style>