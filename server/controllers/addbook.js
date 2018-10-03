//新增图书
//获取豆瓣信息
//入库
const https = require('https');

//要把数据存入mysql就需要连接并获取mysql的实例，腾讯云为我们封装好了相应的mysql实例和操作mysql的js语法
const {mysql} = require('../qcloud')


module.exports = async (ctx)=>{
    const {isbn,openid} = ctx.request.body
    if(isbn&&openid){
        //插入之前先判断数据库是否有该数据，避免重复插入
        const findRes = await mysql('books').select().where('isbn',isbn)
        if(findRes.length){
            ctx.state = {
                code:-1,
                data:{
                    msg:"图书已存在"
                }
            }
            return
        }
        let url = "https://api.douban.com/v2/book/isbn/"+isbn;
        console.log(url)
        const bookinfo = await getJSON(url);
        const rate = bookinfo.rating.average
        const {title,image,alt,publisher,summary,price} = bookinfo
        const tag = bookinfo.tags.map(v=>{
            return `${v.title} ${v.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        try{
            //mysql的操作是异步
            await mysql('books').insert({isbn,openid,rate,title,image,alt,publisher,summary,price,tag,author})
            ctx.state.data = {
                title,
                msg:"success"
            }
        }catch(e){
            ctx.state = {
                code:-1,
                data:{
                    msg:"新增失败："+e.sqlMessage
                }
            }
        }
    }
}

function getJSON(url){
    return new Promise((resolve,reject)=>{
        https.get(url,res=>{
            let urlData = '';
            res.on('data',data=>{
                urlData += data
            })
            res.on('end',data=>{
                const bookinfo = JSON.parse(urlData)
                if(bookinfo.title){
                    resolve(bookinfo)
                }else{
                    reject(bookinfo)
                }
                
            })
        })
    })
}