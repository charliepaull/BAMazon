// require adds in inquirer & mysql npm packages
var inquiry = require("inquirer");
var mysql = require("mysql");

// used to connect mysql database to .js file
var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password & database used
    password: "password",
    database: "bamazon_db"
  });

//   connection.connect(function(err) {
//     if (err) return err;
//     bamazonItem();
//   });
  
function readProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    });
  }

  readProducts();