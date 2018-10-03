<template>
  <div>
    <div class="imgBox"><img :src="userinfo.avatarUrl" alt="" class="img" @click="doLogin"></div>
    <div class="nickName" v-if="userinfo.openId">{{userinfo.nickName}}</div>
    <button v-if="!userinfo.openId" open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin" style="width: 200rpx;font-size: 24rpx;">{{userinfo.nickName}}</button>
    <YearProgress></YearProgress>
    <div class="btnBox"><button class="btn" @click="scanBook" v-if="userinfo.openId">添加图书</button></div>
  </div>
</template>

<script>
  import qcloud from 'wafer2-client-sdk'
  import config from '../../config'
  import utils from '../../utils'
  import YearProgress from '@/components/YearProgress.vue'
export default {
  data () {
    return {
      userinfo:{
        avatarUrl:"../../static/img/photoman.gif",
        nickName:"点击登录"
      }
    }
  },

  components: {
    YearProgress
  },

  methods: {
    async addBook(isbn){
      const res = await utils.post("/weapp/addbook",{
        isbn,
        openid:this.userinfo.openId
      })
      wx.showModal({
        title:"添加成功",
        content:`${res.title}添加成功`,
        showCancel:false
      })
    },
    scanBook(){
      let mythis = this;
      wx.scanCode({
        success(res){
          if(res.result){
            console.log(res.result)
            mythis.addBook(res.result)
            console.log("66")
          }
        }
      })
    },
    doLogin(){
      const self = this;
      let user = wx.getStorageSync("userinfo");
      if(!user){
        qcloud.setLoginUrl(config.host+'/weapp/login')
        qcloud.login({
          success: function (userInfo) {
            wx.setStorageSync("userinfo",userInfo);
            self.userinfo = userInfo;
            wx.showToast({
              title:"登录成功",
              icon:"success"
            });
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      }
    },

  },

  created () {
    console.log("我是个人中心页面");
  },
  onShow(){
    let userinfo = wx.getStorageSync("userinfo");
    if(userinfo){
      this.userinfo = userinfo;
    }
  }
}
</script>

<style scoped>
  .imgBox{
    width: 750rpx;
    text-align: center;
  }
  .img{
    width: 128rpx;
    height: 128rpx;
    border-radius: 50%;
  }
  .nickName{
    width: 750rpx;
    text-align: center;
  }
  .btnBox{
    padding: 0 30rpx;
  }
</style>
