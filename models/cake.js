var orm = require("../config/orm.js");

var cake = {
    all: function(cb) {
        orm.all("cakes", function(res) {
            cb(res);
        });
    },
    create: function(name, cb) {
        orm.create("cakes", [
            "cake_name", "devoured"
        ], [
            name, false
        ], cb);
    },
    update: function(id, cb) {
        var condition = "id=" + id;
        orm.update("cakes", {
            devoured: true
        }, condition, cb);
    },
    delete: function(id, cb) {
        var condition = "id=" + id;
        orm.delete("cakes", condition, cb);
    }
};

module.exports = cake;