const express = require("express");
const router = express.Router();
const userDB = require("../../database/userinfo");//userinfo表的操作对象 
const visitorDB = require("../../database/visitor");//visitor表的操作对象 


//添加访客
async function addVistire(userID){
//通过id查找访问id
let doc= await visitorDB.findOne({visitor:userID});
if(doc){
    // 存在你的数据
    await visitorDB.findOneAndUpdate({visitor:userID},{data:Date.now()});
}else{
    // 不存在
    await visitorDB.create({visitor:userID})
}
}

router.post("/", async (req, res) => {
    let { user, password } = req.body;
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user) && /^[a-zA-Z]\w{5,17}$/.test(password)) {
        //查询数据库中是否存在已经注册的data
        let userDoc = await userDB.findOne({ user })
        if (userDoc === null) {
            res.send({
                code: 2,
                message: "用户不存在，请先注册"
            });
            return;//return相当于返回上面让用户重新登录
        }
        if (userDoc.password === password) {
            //将用户信息存储在session总
            let userInfo = {
                user: userDoc.user,
                _id: userDoc._id,
                phtoto: userDoc.phtoto,
                admin: userDoc.admin
            }
            //将用户信息存储在session总 
            req.session.userInfo = userInfo
            addVistire(userInfo._id);//没登陆一次添加一次访客
            res.send({
                code: 0,
                message: "登录成功",
                data:userInfo//给前端用户数据
            });

        }
        else {
            //密码错误走这
            res.send({
                code: 3,
                message: "密码错误"
            });
            return;
        }
    }
    else {
        res.send({
            code: 1,
            message: "你发送过来的数据格式不规范"
        })
    }
})
//判断是否登录
router.post("/isCheckd",(req,res)=>{
let data =req.session.userInfo
if(data){

    addVistire(req.session.userInfo._id);//更新访问时间
res.send({
    code:0,
    mes:"已登录",
    data
})
}else{
 res.send({
    code:1,
    data:{}
 })
}
})

router.post("/out",(req,res)=>{
req.session.destroy();//销毁当前的session
res.send({
    code:0,
    message:"已退出，请重新登录"
})
})

module.exports = router