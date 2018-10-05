const {mysql} = require('../qcloud')

module.exports = async (ctx)=>{
    //接收page 使用解构赋值
    const {page,openid} = ctx.request.query;
    //规定每次加载个数10使用limit方法
    //设置起点的方法是offset
    const size = 10;
    const mysqlSelect = mysql('books').select('books.*','cSessionInfo.user_info').join('cSessionInfo','books.openid','cSessionInfo.open_id').orderBy('books.id','desc');
    
    let books;
    if(openid){
        books = await mysqlSelect.where('books.openid',openid)
    }else{
        //获取全部图书，分页
        books = await mysqlSelect.limit(size).offset(Number(page)*size)
    }
    
    ctx.state.data = {
        list:books.map(v=>{
            const info = JSON.parse(v.user_info)
            return Object.assign({},v,{
                user_info:{
                    nickName:info.nickName
                }
            })
        })
    }
}