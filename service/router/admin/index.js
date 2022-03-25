//管理权限入口
const express = require("express");
const router = express.Router();


//鉴权 鉴定发起请求的用户是否有管理员权限

router.use((req, res, next) => {
    //判断用户是否已近登录
    if (!req.session.userInfo || (!req.session.userInfo.admin)) {
        return res.send({
            code: 6,
            message: "你没有管理权限，无法访问"
        })
    }
    next();
});


router.post("/isCheck",(req,res)=>{
     res.send({
        code:0,
        message: "你有管理权限，可以访问"
    })
})
//监听，对友链增删改的路由
router.use("/link",require("./link.js"))



//监听artcile路由的数据

router.use("/article",require("./artcile.js"))


//管理反馈
router.use("/contact", require("./contact"));







module.exports = router;