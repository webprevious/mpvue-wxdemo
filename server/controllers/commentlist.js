const {mysql} = require("../qcloud")

module.exports = async (ctx)=>{
    const {bookid,openid} = ctx.request.query;
    
    const mysqlSelect = mysql('comments').select('comments.*','cSessionInfo.user_info').join('cSessionInfo','comments.openid','cSessionInfo.open_id');
    
    let comment;
    if(bookid){
        //如果bookid存在那就是获取图书评论列表
        comment = await mysqlSelect.where('bookid',bookid);
    }else if(openid){
        //个人评论列表,根据个人的openid刷选
        comment = await mysqlSelect.where('openid',openid);
    }
    
    ctx.state.data = {
        list:comment.map(v=>{
            const info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                name:info.nickName,
                image:info.avatarUrl
            })
        })
    }
}