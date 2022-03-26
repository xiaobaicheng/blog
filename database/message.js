const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const msgSchema = new Schema({
    content: {//留言
        type: String,
        required: true
    },
    date: {//留言时间
        type: Number,
        default: Date.now// 默认生成时间段
    },
    likes: [ //点赞数 存所有点赞用户的id
        {
            type: Schema.Types.ObjectId
        }
    ],
    authur: {//当前发表这条评论的用户
        type: Schema.Types.ObjectId,
        ref: "userinfo",//关联表
        required: true

    },
    childen: [//子级回复
        {
            content: {type:String},//留言
            date: {//留言时间
                type: Number,
                default: Date.now// 默认生成时间段
            },
            //这条回复是谁写的 写评论的人的id
            authur: {
                type: Schema.Types.ObjectId,
                ref: "userinfo",//关联表
            },
            likes: [
                {
                    type: Schema.Types.ObjectId
                }
            ],
            //这是子级回复的父级评论的id
            rePleyuser: {
                type: Schema.Types.ObjectId,
                ref: "userinfo",//关联表
            },
        }
    ]
})
module.exports = mongoose.model("message", msgSchema)