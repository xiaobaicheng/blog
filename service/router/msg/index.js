const express = require("express");
const router = express.Router();
const userDB = require("../../database/userinfo");//userinfo表的操作对象 
const messageDB = require("../../database/message");//message表的操作对象 
const { findById } = require("../../database/userinfo");
//鉴权 判断用户是否登录

router.use((req, res, next) => {
    if (!req.session.userInfo) {
        res.send({
            code: 6,
            message: "未登录,不能发表留言"
        });
    }
    next();
})
//发表留言的路由 
router.post("/pubulish", async (req, res) => {
    let { valMeg } = req.body;
    // console.log(req.session);
    valMeg = valMeg.trim();
    //验证数据格式是否正确
    if (!valMeg || valMeg.length > 100) {
        res.send({
            code: 5,
            message: "你发表的留言有误"
        })
    }
    //将评论存储在数据库
    await messageDB.create({
        content: valMeg,
        authur: req.session.userInfo._id//当前发表这条评论的用户id
    });
    return res.send({
        code: 0,
        message: "留言发表成功"
    })
})

//给父级路由点赞评论
router.post("/likes/comment", async (req, res) => {
    let { id } = req.body;//评论id
    //判断id存不存在
    if (!id) {
        return res.send({
            code: 1,
            message: "你没发评论的id过来"

        })
    }
    //评论id在数据库中不存在
    let commentDoc = await messageDB.findById(id);
    if (!commentDoc) {
        return res.send({
            code: 2,
            message: "你发表评论id在数据库中不存在"

        })
    }
    let userId = req.session.userInfo._id;//当前发起请求的用户id
    //判断用户是否点过赞 是否存在likes数组中
    if (commentDoc.likes.includes(userId)) {
        //存在 点过赞 取消赞
        await messageDB.findByIdAndUpdate(id, { $pull: { likes: userId } })//借助￥pull删除数组中的id

    } else {
        //没点过赞 要点赞
        await messageDB.findByIdAndUpdate(id, { $push: { likes: userId } })
    }
    res.send({
        code: 0,
        message: "点赞/取消的功能已完成"
    })
})


//在父级评论下提交回复内容
router.post("/reply/submit", async (req, res) => {
    let { id, content, replyUser } = req.body;
    //id 父评论的id content内容 replyUser 父评论的作者id
    if (!content) return res.send({
        code: 1,
        message: "回复内容不能为空"
    })
    if (content.length > 100) return res.send({
        code: 2,
        message: "回复内容不能超过100"
    })
    //判读当前这条父级评论是否存在
    let doc1 =await messageDB.findById(id)
    if (!doc1) return res.send({
        code: 4,
        message: "评论id错误 "
    })
    let doc2 = await messageDB.findById(id)
    if (!doc2) return res.send({
        code: 3,
        message: "评论id错误 "
    })
    await messageDB.findByIdAndUpdate(id, {
        //向这条父级评论下的cherid数组中添加1回复数据
        $push: {
            childen: {
                content,
                authur: req.session.userInfo._id,//写回复的用户id， 这条回复是谁写的
                replyUser  //回复的父级评论的用户id，被回复的那个人的id
            }
        }
    });
    res.send({
        code: 0,
        message: "回复成功"
    })
})




//子级回复的点赞功能
router.post("/likes/repaly", async (req, res) => {
    let { pId, cId, index } = req.body;
    let parent = await messageDB.findById(pId);//夫文档数据
    let child = await parent.childen.id(cId)//通过夫文档。id（子文档）查询到子文档
    //父级评论的id是否存在 
// 
    // if (!pId) return res.send({ code: 5, message: "父级评论id不存在" })
        //子级评论的id是否存在  
    // if (!cId) return res.send({ code: 6, message: "子级评论id不存在" })
    let userId = req.session.userInfo._id;//当前发起请求的用户id
    //判断用户是否点过赞 是否存在likes数组中
    if (child.likes.includes(userId)) {
        //存在 点过赞 取消赞
        await messageDB.findByIdAndUpdate(pId, {
            $pull: {
                [`childen.${index}.likes`]: userId
            }
        })//借助￥pull删除数组中的id

    } else {
        //没点过赞 要点赞
        await messageDB.findByIdAndUpdate(pId, {
            $push: {
                [`childen.${index}.likes`]: userId
            }
        })
    }
    res.send({
        code: 0,
        message: "点赞/取消赞成功"
    })
})

module.exports = router