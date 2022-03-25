const express = require("express");
const { findByIdAndUpdate } = require("../../database/contact");
const router = express.Router();
const contactDB = require("../../database/contact")
router.post("/updata",async(req,res)=>{
    let {id,raading} =req.body;
    await contactDB.findByIdAndUpdate(id,{raading});
    res.send({code:0, message:"成功修改状态"});
})

module.exports = router;