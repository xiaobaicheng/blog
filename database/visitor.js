const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const visitorSchema = new Schema({
    visitor:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"userinfo"//关联用户表
    },
    //访问时间
    date:{
        type:Number,
        default:Date.now()
    }
})
module.exports = mongoose.model("visitor",visitorSchema)