const express =require("express");
const path = require('path')
let app=express();
app.listen(4001,()=>{
    console.log("启动成功开始监听4001端口");
})
//配置数据库
require("./middleware/mongoose")
//配置基础中间件
app.use(require("./middleware/cors"))//允许跨域
app.use(require("./middleware/session"))//session存储
app.use(express.json())//
app.use(express.urlencoded({extended:true}))
app.use(express.static("./public"))   //配置静态资源
//设置路由监听 
app.use("/",require("./router/index"));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))
})