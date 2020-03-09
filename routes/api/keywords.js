const express = require("express");
const keys = require("../../config/keys");
const router = express.Router();
const Keyword = require("../../models/Keyword");
const mongoose = require("mongoose");
const passport = require("passport");
require("../../config/passport")(passport);
const jwt = require("jsonwebtoken");


router.get("/", async (req, res) => {
    try {
        const keyword = await ((Keyword.find({
            name: req.query.search
        }).count())) > 0;
        res.json(keyword);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

// router.get("/", async (req, res) => {
//     try {
//         Keyword.find({}, {"_id": 0}).then(keywords => res.json(keywords));
//     }
//     catch (err) {
//         res.status(500).send(err.message);
//     }
// })

router.post(
    "/",
    (req, res) => {
        req.body.instructions = {};
        const newKeyword = new Keyword({
            name: req.body.name
        });

        newKeyword.save().then(keyword => res.json(keyword));
    }
);

module.exports = router;
