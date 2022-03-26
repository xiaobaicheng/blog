const express = require("express");
const router = express.Router();
const linkDB = require("../../database/link")

//添加友链到数据库
router.post("/addData", async (req, res) => {
    //鉴定格式是否为空
    await linkDB.create(req.body);
    res.send({
        code: 0,
        message: "数据添加成功"
    })
})


//修改数据
router.post("/updata", async (req, res) => {
    let { _id, name, home, logo, describe } = req.body;
    //数据校验
    await linkDB.findByIdAndUpdate(_id, { name, home, logo, describe });//到数据表中修改数据
    res.send({
        code: 0,
        message: "友链修改成功"
    })
})
//删除数据
router.delete("/delet", async (req, res) => {
    let { _id } = req.body;
    //判断友链id是否存在
    let linkDoc = await linkDB.findById(_id);
    if (!linkDoc) return res.send({ code: 1, message: "你要删除的友链id不存在数据库" })
    await linkDB.findByIdAndDelete(_id);//根据id删除数据
    res.send({
        code: 0,
        message: "友链删除成功"
    })
})
module.exports = router;