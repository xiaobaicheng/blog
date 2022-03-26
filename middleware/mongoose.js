const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog",{
    //连接数据库时的基本配置项
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("数据库连接成功");
}).catch((err)=>{
console.log("数据库连接失败",err);
})