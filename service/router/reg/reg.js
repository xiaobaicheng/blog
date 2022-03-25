const express = require("express");
const router = express.Router();
const userDB = require("../../database/userinfo");//userinfo表的操作对象 

router.post("/",async (req, res) => {
    // console.log(req.body);
    // res.send("111")
    let { user, password } = req.body;
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user) && /^[a-zA-Z]\w{5,17}$/.test(password)) {
        //查询用户是否已经存在
        let userDec = await userDB.findOne({ user });
        if (userDec) {
            res.send({
                code: 2,
                message: "用户已存在"
            })
        }
        else{
            //不存在相同数据
            await userDB.create({user,password});
            res.send({
                code:0,
                message:"注册成功"
            })
        }
    }
    else{
        res.send({
            code:0,
            message:"你发送过来的数据格式不规范"
        })
    }
})
module.exports = router