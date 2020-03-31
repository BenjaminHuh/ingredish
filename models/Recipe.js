const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    keywords: {
        type: [String],
        required: true,
        text: true
    },
    directions: {
        type: Object,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    nutrition_facts: {
        type: String,
        required: true
    },
    comments: {
        type: [String]
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = Recipe = mongoose.model("recipes", RecipeSchema);
