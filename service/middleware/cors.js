const cors=require("cors");
module.exports=cors({
    origin:"http://localhost:8080",//只允许当前地址进行访问
    credentials:true,
})  