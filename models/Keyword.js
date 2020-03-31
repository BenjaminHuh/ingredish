const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KeywordSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = Keyword = mongoose.model("keywords", KeywordSchema);
