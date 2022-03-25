const express = require("express");
const router = express.Router();
const userDB = require("../../database/userinfo");//userinfo表的操作对象 
const messageDB = require("../../database/message");//message表的操作对象
const linkDB = require("../../database/link");//link表
const { find } = require("../../database/userinfo");
const aricleDb = require("../../database/article")
const contactDB = require("../../database/contact")
const visitorDB = require("../../database/visitor");//visitor表的操作对象 


//提交评论数据
router.get("/msg", async (req, res) => {
    let msgDoc = await messageDB
        .find().populate("authur", { password: 0, __v: 0, admin: 0 })
        .populate("childen.authur", { password: 0, __v: 0, admin: 0 })//同时查询写子级回复的用户id
    // console.log(msgDoc);
    // .populate("childen.replyUser",{password:0, __v:0, admin:0})//同时查询写子级回复的用户id

    // console.log(msgDoc);
    res.send({
        code: 0,
        message: "留言请求成功",
        data: msgDoc
    });
})

//获取友链数据
router.get("/link", async (req, res) => {
    let linkDoc = await linkDB.find();//查询所有数据
    res.send({
        code: 0,
        message: "友链数据获取成功",
        data: linkDoc
    });
})

//获取文章详情数据
router.get("/articleDtailes", async (req, res) => {
    let { id } = req.query;//文章id
    let Doc = await aricleDb.findById(id);
    await aricleDb.findByIdAndUpdate(id,{$inc:{readingNum:1}})//设置阅读量自增1
    if (!Doc) //无数据
        return res.send({
            code: 1,
            message: "文章id有误，查不到",
        });
    res.send({
        code: 0,
        message: "查询成功", data: Doc
    })
})


//获取全部文章数据
router.get("/article", async (req,res)=>{
    let doc = await aricleDb.find({},{},{sort:{readingNum:-1}});//阅读量大的排上面
    if(doc.length === 0 ){
        res.send({code:5,message:"暂无文章数据，请通知管理员上传"})
    }
    else{
        res.send({code:0,message:"文章数据获取成功",data:doc})
    }
})

//获取反馈数据
router.get("/contact",async(req,res)=>{
    let doc = await contactDB.find();
    res.send({
        code:0,
        message:"反馈数据获取成功",
        data:doc
    })
})


//获取访客数据
router.get("/visitor",async (req,res)=>{
    let doc = await visitorDB.find().populate("visitor",{password:0,__v:0})
    // console.log(doc);
    res.send({
        code:0,message:"访客数据获取成功",
        data:doc
    })
})
module.exports = router;