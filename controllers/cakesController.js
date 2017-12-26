var express = require("express");

var router = express.Router();
var cake = require("../models/cake.js");

router.get("/", function(req, res) {
    res.redirect("/cakes");
});

router.get("/cakes", function(req, res) {
    cake.all(function(cakeData) {
        res.render("index", { cake_data: cakeData });
    });
});

router.post("/cakes/create", function(req, res) {
    cake.create(req.body.cake_name, function(result) {
        console.log(result);
        res.redirect("/");
    });
});

router.put("/cakes/update", function(req, res) {
    cake.update(req.body.cake_id, function(result) {
        console.log(result);
        res.redirect("/");
    });
});

router.delete("/cakes/update", function(req, res) {
    cake.delete(req.body.cake_id, function(result) {
        console.log(result);
        res.redirect("/");
    });
});

module.exports = router;