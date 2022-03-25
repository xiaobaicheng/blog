const mongoose=require("mongoose");
const Schema =mongoose.Schema;
const userSchema=new Schema({
    user:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true   
    },
    admin:{
        type:Boolean,
        default:false//默认非管理员设置
    },
  phtoto:{
      type:String,
      default:"/imges/phtoto/1.jpg"
  }
})
module.exports=mongoose.model("userinfo",userSchema)