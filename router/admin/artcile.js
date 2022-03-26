const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const aricleDb = require("../../database/article")


//监听md文件上传的路由
router.post("/md", (req, res) => {
    let name = null;
    //存储md文件到服务器下的指定目录
    // 配置multer中间件处理表单上传的md文件
    let upload = multer({
        storage: multer.diskStorage({ //配置项
            // 设置文件存储在服务端的哪个目录
            destination(req, file, callback) {
                callback(null, path.join(__dirname, "../../public/file/md"));
            },
            // 设置文件的名字（防重名）
            filename(req, file, callback) {
                // 名称.后缀名   file.originalname
                let { ext } = path.parse(file.originalname);
                name = "md-" + req.session.userInfo._id + new Date().getTime() + ext;
                callback(null, name);
            }
        })
    }).single("file"); //处理name名为file的控件上传的图片文件   name值要匹配

    upload(req, res, async (err) => {
        //上传失败
        if (err) {
            res.send({ code: 9, message: "上传失败" });
        } else {
            res.send({ code: 0, message: "md文件上传成功", mdUrl: `/file/md/${name}` });
        }
    });
})

//监听cover封面上传的路由
router.post("/cover", (req, res) => {
    let name = null;
    //存储md文件到服务器下的指定目录
    // 配置multer中间件处理表单上传的md文件
    let upload = multer({
        storage: multer.diskStorage({ //配置项
            // 设置文件存储在服务端的哪个目录
            destination(req, file, callback) {
                callback(null, path.join(__dirname, "../../public/file/cover"));
            },
            // 设置文件的名字（防重名）
            filename(req, file, callback) {
                // 名称.后缀名   file.originalname
                let { ext } = path.parse(file.originalname);
                name = "cover-" + req.session.userInfo._id + new Date().getTime() + ext;
                callback(null, name);
            }
        })
    }).single("file"); //处理name名为file的控件上传的图片文件   name值要匹配

    upload(req, res, async (err) => {
        //上传失败
        if (err) {
            res.send({ code: 9, message: "封面上传失败" });
        } else {
            res.send({ code: 0, message: "封面上传成功", coverUrl: `/file/cover/${name}` });
        }
    });
})


//监听文章数据的路由 /将文章数据添加到数据库
router.post("/add", async (req, res) => {
    let { title, describe, mdUrl, coverUrl } = req.body;
    //将文章数据存储到数据库
   let Doc = await aricleDb.create({
        title:title || undefined, describe:describe || undefined ,mdUrl,
        coverUrl:coverUrl || undefined,
        author:req.session.userInfo._id,

    });
    res.send({
        code:0,
        message:"文章发表成功",
        data:{id:Doc._id}//响应返回文章id
    })
})

//修改文章数据
router.post("/updata", async (req,res)=>{
    let {id,doc} = req.body;
    await aricleDb.findByIdAndUpdate(id,doc);
    res.send({code:0,message:"修改成功"})

})
//删除文章路由
router.delete("/deldet",async (req,res)=>{
    let {id} =req.body;
    await aricleDb.findByIdAndDelete(id);
    res.send({code:0,message:"删除成功"})
})
module.exports = router;