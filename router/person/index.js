const express = require("express");
const router = express.Router();
const userDB = require("../../database/userinfo");//userinfo表的操作对象 
const multer = require("multer");
const path = require("path");
//鉴权 判断用户是否登录

router.use((req, res, next) => {
    if (!req.session.userInfo) {
        res.send({
            code: 9,
            message: "未登录,不能修改个人信息"
        });
    }
    next();
})


//修改用户名
router.post("/user", async (req, res) => {
    let { user } = req.body;
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user)) {
        if (user === req.session.userInfo.user) {
            return res.send({
                code: 4,
                message: "用户重名"
            });
        }
        let userDoc = await userDB.findOne({ user })
        if (userDoc) {
            return res.send({
                code: 3,
                message: "该用户名被别人注册过了"
            });
        }
        //修改数据库连接中的数据名
        await userDB.findByIdAndUpdate(req.session.userInfo._id, { user })
        //更新session中的数据
        req.session.userInfo.user = user;
        res.send({
            code: 0,
            message: "修改成功",
            data: req.session.userInfo//提供新数据给前端
        });
    }
    else {
        res.send({
            code: 2,
            message: "用户不存在，请先注册"
        });
    }
})
//修改密码
router.post("/pass", async (req, res) => {
    let { oldpassword, newpassword } = req.body;
    if (/^[a-zA-Z]\w{5,17}$/.test(oldpassword)) {
        //比对新密码和旧密码是否一致
        if (oldpassword === newpassword) {
            return res.send({
                code: 7,
                message: "新旧密码一致，不能相同"
            });
        }
        //判断旧密码是否和数据库里面的密码一致
        let doc = await userDB.findById(req.session.userInfo._id);
        if (doc.password !== oldpassword) {
            return res.send({
                code: 8,
                message: "旧密码不正确"
            });
        }

        //到数据中修改密码
        await userDB.findByIdAndUpdate(req.session.userInfo._id, { password: newpassword })
        req.session.destroy();//销毁当前的session
        res.send({
            code: 0,
            message: "密码修改成功"
        });
    } else {
        res.send({
            code: 6,
            message: "你发过来的数据格式不对"
        });
    }
})
//修改头像
router.post("/phtoto", async (req, res) => {
    let name = null;
    //配置multer处理图片文件
    let upload = multer({
        storage: multer.diskStorage({
            //设置文件存储在服务端那个文件目录下
            destination(req, file, callback) {
                callback(null, path.join(__dirname, "../../public/imges/phtoto"))
            },
            //设置文件名，注意防止重名
            filename(req, file, callback) {
                // 名称.后缀名   file.originalname
                //解构 file.originalname中的ext  这是传过来的文件后缀名
                let { ext } = path.parse(file.originalname);
                name = req.session.userInfo._id + new Date().getTime() + ext;
                callback(null, name)
            }
        })
    }).single("file");//处理文件名为file控件上传的图片文件 name名要匹配
    upload(req,res, async (err)=>{
        if(err){
             res.send({
                code: 9,
                message: "头像上传失败"
            });
        }else{//文件已经存储成功到指定的文件目录下
            let phtoto = `/imges/phtoto/${name}`
            //修改数据库里面的路径
            await userDB.findByIdAndUpdate(req.session.userInfo._id,{phtoto});
            //修改session中的数据
            req.session.userInfo.phtoto = phtoto;
            //响应前端
            res.send({
                code: 0,
                message: "头像修改成功",
                data:req.session.userInfo
            });
        }
    }) 
})
module.exports = router