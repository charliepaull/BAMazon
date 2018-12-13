// require adds in inquirer & mysql npm packages
var inquiry = require("inquirer");
var mysql = require("mysql");

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

// FORMAT PRICES IN TABLE CORRECTLY
var query = "SELECT * FROM products";
// connection to mysql server & sql database
    connection.query(query, function(err, response){
    if (err) return err;
    // response object if no error
    // console.log(response);
    console.log("ID\t product_name\t\t\t\t price($) \t stock_quantity");
    console.log("----------------------------------------------")
    for (var i = 0; i < response.length; i++){
        console.log(response[i].id + "\t" + response[i].product_name + "\t\t\t\t" + response[i].price + "\t" + response[i].stock_quantity);
    }
    requestProduct();
    });
    

    // Task: Ask the user questions
      // ask for ID of product they'd like to buy
      // ask for unit quantity of product

    // function that prompts user to act and input answers (will call function later)

    // prompt functionality works
    function requestProduct(){
      // start inquiry module (required globally)
      inquiry
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
      ])
      
      // this is the response object (using .then(), callback)
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
              console.log(answer);
            }
            connection.end()
          }
        );

        // check if item is in stock
        if (answer.stock_quantity < stock_quantity){
          console.log("Sorry, there are only" + stock_quantity + "items left in at BAMazon.\nPlease choose a different stock quantity.")
        }
        
      })
    };