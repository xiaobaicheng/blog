const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    name:String,
    email:String,
    message: String,
    date:{type:Number,default:Date.now()},
    //是否已经查看
    raading:{type:Boolean,default:false}
})
module.exports = mongoose.model("contact", contactSchema)