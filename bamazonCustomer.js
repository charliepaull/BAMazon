// require adds in inquirer & mysql npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table2");
require("console.table");


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

// Challenge #1: Customer
// Task: show user items in BAMazon
// query here selects * from product table & displays

// FORMAT PRICES IN TABLE CORRECTLY
// function that loads the full table to show user all BAMazon products
function loadProducts(){
    var query = "SELECT * FROM products";
    // query from connected sql database
    connection.query(query, function(err, res){
      if (err) return err;
      // response object - formatted to show all items and data to user
      console.table(res);
      // WORKS: sql table shown to user.

    // invoke function to ask user item requests.
      requestProduct();
    })
}















    // *prompt functionality works*
    function requestProduct(product){
      // start inquirer module (required globally)
      inquirer
        // structure of inquire: object
        .prompt([
        {
        // ask user to select product by item_id
          name: "id",
          type: "input",
          message: "Please choose a product using the ID #: "   
        },
        {
        // asking user to select unit quantity of desired product
          name: "quantity",
          type: "input",
          // User choice: can exit BAMazon, or select unit quantity
          message: "Please select the unit quantity you'd like. [You can also leave BAMazon by pressing 'Q']",
          // validation logic for message above
          validate: function (value) {
            return value > 0 || value.toLowerCase() === "q";
        }
        }

      // this is the response object (using .then(), callback)
        ])
        .then(function (value) {
            // if user clicked "q", then execute function to leave app
            checkIfShouldExit(value.quantity);
            // check to see if product is in stock
            // user unit quantity input
            var quantity = parseInt(value.quantity);
            var product = parseInt(value.id)
            // out of stock, execute
            if (quantity > value.stock_quantity) {
              console.log("Insufficient Quantities, please select another quantity of units.");
              loadProducts();
            }
        // otherwise, connect to database to reveal product & unit quantity
        // use & connect to create sql database
        connection.query(
          "SELECT ? FROM products",
          // display user answers from prompt
          {
            id: value.id,
            stock_quantity: value.stock_quantity,
          },
          function(err){
            if (err) return err;
            else {
              console.log("We've received your order!")
              console.table(value);
            }
            makePurchase(product, quantity);
            connection.end()
          }
        );
      });
    };

    // updates stock_quantity if user purchase is made
    function makePurchase(product, quantity){
      connection.query(
      // SQL query to update products table with new stock quantity after purchase
          "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
          [quantity, product],
          function(err, res){
            if (err) return err;
              console.log("Thank you! You've successfully purchased " + quantity + " items of ID #: " + product)
              loadProducts();
          },  
          // "SELECT ? FROM products",
          // [quantity, price],
          // function (err, res){
          //   if (err) return err;
          //   var total = price * quantity;
          //   console.log("Your total is: $" + total);
          // } 
      );
  };

    function checkIfShouldExit(choice) {
      if (choice.toLowerCase() === "q"){
        console.log("Thank you for searching on BAMazon");
        process.exit(0);
      }
    }

    // Function if user drains an item stock
  // function noStock(){
  //   if (stock_quantity = 0){
  //     var upQuery = "DELETE FROM products WHERE (stock_quantity = 0)";

  //   }
  // }

  // Challenge #3: 