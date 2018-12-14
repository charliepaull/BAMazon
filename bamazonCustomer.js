// require adds in inquirer & mysql npm packages
var inquirer = require("inquirer");
var mysql = require("mysql");
// var Table = require("cli-table2");
require("console.table");

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

// Task: show user items in BAMazon
// query here selects * from product table & displays

// Creates the connection with the server and loads the product data upon a successful connection
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

// FORMAT PRICES IN TABLE CORRECTLY
function loadProducts(){
var query = "SELECT * FROM products";
// connection to mysql server & sql database
    connection.query(query, function(err, response){
    if (err) return err;
    // response object if no error
    // console.log(response);
    // var table = new Table({ head: ["ID", "product_name", "Price", "stock_quantity"] });
    // console.log(table);
    console.log("ID\t product_name\t\t\t\t price($) \t stock_quantity");
    console.log("----------------------------------------------")
    for (var i = 0; i < response.length; i++){
        console.log(response[i].id + "\t" + response[i].product_name + "\t\t\t\t" + response[i].price + "\t" + response[i].stock_quantity);
    }
    requestProduct();
    });
  };
    

    // Task: Ask the user questions
      // ask for ID of product they'd like to buy
      // ask for unit quantity of product

    // function that prompts user to act and input answers (will call function later)

    // prompt functionality works
    function requestProduct(){
      // start inquiry module (required globally)
      inquirer
        // structure of inquire: object
      .prompt([
        {
        // asking user to select product by item_id
          name: "ID",
          type: "input",
          message: "Please choose a product using the ID #: "   
        },
        {
        // asking user to select unit quantity of desired product
          name: "unit quantity",
          type: "input",
          message: "Please choose your unit quantity of the desired product: "
        }

      // this is the response object (using .then(), callback)
      ])
      .then(function(answer){
        // use & connect to create sql database
        connection.query(
          "SELECT ? FROM products",
          // display user answers from prompt
          {
            id: answer.id,
            stock_quantity: answer.stock_quantity,
          },
          function(err){
            if (err) return err;
            else {
              console.log("We've received your order!")
              console.table(answer);
            }
            connection.end()
          }
        );
        // };
        // check if item is in stock
        // if there an insufficient amt of stock
        // if (answer.stock_quantity < stock_quantity){
        //   console.log("Sorry, there are only" + stock_quantity + "items left at BAMazon.\nPlease choose a different stock quantity.")
        // }
        // // sufficient stock = update database to subtract stock
        // // print out order information to user
        // else{
        //   connection.query(
        //     "UPDATE stock_quantity FROM id",
            
        //   )
        // }
      
      });
    };

    function checkIfShouldExit(choice) {
      if (choice.toLowerCase() === "q"){
        console.log("Goodbye");
        process.exit(0);
      }
    }