<template>
  <div>
    <TopSwiper :tops="tops"></TopSwiper>
    <Card :key="book.id" v-for="book in books" :book="book"></Card>
    <p class="text-footer" v-if="!more">没有更多数据</p>
  </div>
</template>

<script>
import utils from '../../utils.js'
import Card from '@/components/Card.vue'
import TopSwiper from '@/components/TopSwiper.vue'

export default {
  data () {
    return {
      books:[],
      page:0,//当前是第几页，默认第0页
      more:true,//是否有更多数据
      tops:[],//保存排名靠前的书
    }
  },

  components: {
    Card,
    TopSwiper
  },

  methods: {
    //init字段记录是否第一次加载初始化，下拉刷新和初始化的时候都是加载第一页
    async getList(init){
      if(init){
        this.page = 0;
        this.more = true;
      }
      wx.showNavigationBarLoading();
      const books = await utils.get('/weapp/booklist',{page:this.page})
      if(books.list.length<10 && this.page>0){
        this.more = false;
      }
      if(init){
        this.books = books.list;
        wx.stopPullDownRefresh();
      }else{
        console.log(this.books);
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading();
    },

    async getTop(){
      const tops = await utils.get('/weapp/top');
      this.tops = tops.list;
    }

  },
  onPullDownRefresh(){
    this.getList(true);
    this.getTop();//获取访问排名靠前的前几名组成轮播图
  },
  onReachBottom(){
    if(!this.more){
      //说明没有更多数据了
      return false;
    }
    this.page = this.page + 1;
    this.getList(false);
  },

  created () {
    console.log("我是首页启动");
    this.getList(true);//获取图书列表
    this.getTop();//获取访问排名靠前的前几名组成轮播图
  },
  
}
</script>

<style scoped>
.text-footer{
  text-align: center;
  font-size: 24rpx;
}
</style>
