const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const articleSchema=new Schema({//文章
    //文章标题   title
    //描述 describe
    //md文件地址 
    //cover文件地址
    //发表时间
    //阅读数
    //作者
    title: {type:String,default:"暂无标题"},
    describe: {type:String,default:"暂无描述"},
    mdUrl:{type:String,required:true},
    coverUrl:{type:String,default:"/file/cover/2.jpg"},
    date:{type:Number,default:Date.now()},
    readingNum:{type:Number,default:0},
    author:{type:Schema.Types.ObjectId,ref:"userinfo",required:true}

})
module.exports=mongoose.model("articleinfo",articleSchema)