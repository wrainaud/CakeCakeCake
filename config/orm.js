var connection = require("./connection.js");

var tableName = "cakes";

var orm = {

  getCakes: function(callback) {
    var s = "SELECT * FROM " + tableName;

    connection.query(s, function(err, result) {

      callback(result);

    });
  },

  deleteCake: function(id, callback) {

    var s = "DELETE FROM " + tableName + " WHERE id=?";

    connection.query(s, [id], function(err, result) {

      callback(result);
    });

  },

  addCake: function(cake, callback) {
    var s = "INSERT INTO " + tableName + " (text, complete) VALUES (?,?)";
    cake.complete = cake.complete || 0;
    connection.query(s, [
      cake.text, cake.complete
    ], function(err, result) {

      callback(result);

    });
  },

  editCake: function(cake, callback) {
    var s = "UPDATE " + tableName + " SET text=? WHERE id=?";

    connection.query(s, [
      cake.text, cake.id
    ], function(err, result) {

      callback(result);

    });
  }

};

module.exports = orm;
