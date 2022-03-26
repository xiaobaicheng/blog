const express =require("express");
let router=express.Router();
// router.post("/reg",(req,res)=>{
// res.send("注册的数据请求到了")
// })

//监听注册路由
router.use("/reg",require("./reg/reg.js"))
//监听登录路由
router.use("/login",require("./login/login.js"))
//监听修改用户信息的路由
router.use("/person",require("./person/index.js"))
//监听留言/评论的路由
router.use("/msg",require("./msg/index.js"))

//监听获取评论/文章的路由
router.use("/getdata",require("./getData/index.js"))

//对后台管理的处理
router.use("/administer",require("./admin/index.js"))


//对提交反馈的监听
router.use("/contact",require("./contact/index.js"))
module.exports=router;


