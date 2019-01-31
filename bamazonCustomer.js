// require adds in inquirer & mysql npm packages
var inquirer = require("inquirer");
require("console.table");
var connection = require("../BAMazon/config/connection");


// Challenge #1: Customer

    // *prompt functionality works, but stock quantity doesn't alert when it's zero*
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

      // response object to grab data
        ])
        .then(function (value) {

          // run fetchproduct();

          // if no enough quantity or out of stock: run loadProduct();
          // else: "We've received your order, thank you!";



            // if user clicked "q", then execute function to leave app
            if (value === "q"){
              checkIfShouldExit(value);
            }
            else {
              connection.query(
              "SELECT ? FROM products", function(err, res){}
              // display user answers from prompt
            // check to see if product is in stock
            // user unit quantity input
              var quantity = parseInt(value.quantity);
              var product = parseInt(value.id)
              var stock_quantity = parseInt(value.stock_quantity);
              var changeQuant = parseInt(stock_quantity - quantity);
              var cost = (quantity * product).toFixed(2);
              // out of stock, execute
              console.log(value.stock_quantity);
              if (quantity > value.stock_quantity) {
                console.log("Insufficient Quantities, please select another quantity of units.");
                loadProducts();
            }
            }
        // otherwise, connect to database to reveal product & unit quantity
        // use & connect to create sql database
        
          
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

            // ====================================
            // add here the purchaseValue() function that tells the user the price
            // ====================================


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

    // grab stock quantity

    
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