// require adds in inquirer & mysql npm packages
var inquiry = require("inquirer");
var mysql = require("mysql");
var divider = "\n------------------------------\n";

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

// have user choose item from list using inquire
var query = "SELECT * FROM products";
    connection.query(query, function(err, response){
    if (err) return err;
    // console.log(response);
    for (var i in response){
        // START HERE - help format the object to show user all products
        var final = `
        ${response[i].id} | $${response[i].item_id} | Product Name: ${[i].product_name} 
        | Dept: ${response[i].department_name} | Price: ${response[i].price}
        Stock: ${response[i].stock_quantity}
      `}
      console.log(final);
    connection.end();
});
  
// /*use connection.query for all function to connect 
// sql datbase & bamazonCustomer.js file data*/
// function requestItem(){
//     inquiry
//     .prompt({
//         name: "item",
//         type: "input",
//         message: "Which item do you want?"
//     })
//     .then(function(answer){
//         console.log(answer.item);
//         connection.query("SELECT * FROM products")
//     })

// // 
// function readProducts() {
//     console.log("Selecting all products...\n");
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       console.log(res);
//       connection.end();
//     });
//   }

// //   readProducts();