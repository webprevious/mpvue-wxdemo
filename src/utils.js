//工具库
import config from './config'

//封装异步请求Promise

export default{
    get(url,data){
        return request(url,"GET",data)
    },
    post(url,data){
        return request(url,"POST",data)
    }
}

function request(url,method,data){
    return new Promise((resolve,reject)=>{
        wx.request({
            data,
            method,
            url: config.host+url,
            success (res) {
              if(res.data.code==0){
                  resolve(res.data.data)
              }else{
                    wx.showModal({
                        title:"添加失败",
                        content:`${res.data.data.msg}`,
                        showCancel:false
                    })
                  reject(res.data)
              }
            }
        })
    })
}
