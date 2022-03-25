const express = require("express");
const router = express.Router();
const contactDB = require("../../database/contact")
router.post("/",async(req,res)=>{
    let {name,email,message} = req.body;
    if(name && email && message){
        //存储到数据库
        await contactDB.create({name,email,message})
        res.send({code:0,message:"提交反馈成功"})
    }else{
        res.send({code:6,message:"提交反馈格式不正确"})
        
    }
})


module.exports = router;