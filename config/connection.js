// Require mysql for connection
var mysql = require("mysql");

// BOILER PLATE STRUCTURE - ALWAYS USE 
// ------------------------------------
// create connection information to sql database
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password & database name
    password: "password",
    database: "bamazon_db"
  });

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
    }
    loadProducts();
  });
  // ------------------------------------

