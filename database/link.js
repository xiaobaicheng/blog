const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const linkSchema = new Schema({//友链
    name: String,
    home: String,
    logo: String,
    describe: String,
})
module.exports = mongoose.model("linkinfo", linkSchema)