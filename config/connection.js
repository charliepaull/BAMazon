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


// ------------------------
// SQL queries

// some variables
// quantity difference
var quantDiff = parseInt(stockQ - userQ);


// loads all data in database
function loadProducts(){
    var qLoad = "SELECT * FROM products";
    // query from the database
    connection.query(qLoad, function(err, res){
        if (err) return err;
        
        // if successful, trigger next function: ask user questions, from inuqirer
        requestProduct(res);
    });
};


// fetch product from SQL db
function fetchProduct(){
    // selecting item (in ?) from products table
    var qFetch = "SELECT ? FROM products";
    // query from database
    connection.query(qFetch, function(err, res){
        if (err) return err;

        // get product name
        var prodName = value.id;
        // get quantity of desired product (in DB)
        var stockQ = parseInt(res.stock_quantity);
        // get user quantity
        var userQ = parseInt(value.stock_quantity);

        // check to see if stock_quantity can complete order
        if (userQ > stockQ){
            console.log("Insufficient Quantites, please select another.");
            // relead product table for user
            loadProducts();
        }

        // is stock_quantity zero?
        if (stockQ === 0){
            console.log("We're out of stock! Choose another product");
            // reload product table for user
            loadProducts();
        }

        // sufficient quantity, show user product & stock_quantity
        console.log(prodName, userQ);
        console.log("We've received your order!");

    });
};

// query to tell user the amount for the purchase
function completePurchase(value){
    // update SQL db with new stock_quantity 
    var q = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?";
    connection.query(q, quantDiff, function(err, res){
        if (err) return err;

        // if successful
        console.log("Thank you! Your purchase is successful. The total is below.");

        // total price
        var totalPrice = value.stock_quantity * res.price;
        console.log("Your total is: $" + totalPrice);

        connection.end();
    });
}



// export it
module.exports = connection;
