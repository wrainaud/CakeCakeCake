// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// grab the orm from the config
// (remember: connection.js -> orm.js -> route file)
var orm = require("../config/orm.js");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/api/cakes", function(req, res) {
    orm.getCakes(function(results) {
      res.json(results);
    });
  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/cakes", function(req, res) {
    orm.addCake(req.body, function(results) {
      res.json(results);
    });
  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/cakes/:id", function(req, res) {
    orm.deleteCake(req.params.id, function(results) {
      res.json(results);
    });
  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/cakes", function(req, res) {
    orm.editCake(req.body, function(results) {
      res.json(results);
    });
  });
};
