var mysql = require("mysql");

var source = {
  // localhost
  localhost: {
    port: 3306,
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "cakeList"
  },

  // jawsDB
  // jawsDB: {
  //   port: 3306,
  //   host: "x3ztd854gaa7on6s.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  //   user: "o5ikum4fe961ryv4",
  //   password: "buifi9lbf1mbiyo4",
  //   database: "cakeList"
  // }
};

// Hook into JAWS DB or default to localhost
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(source.localhost);
  // connection = mysql.createConnection(source.jawsDB);
} else {
  connection = mysql.createConnection(source.localhost);
}

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
