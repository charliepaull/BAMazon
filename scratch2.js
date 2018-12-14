function requestProduct(product){
    inquirer
        .prompt([
            {
                type: "input",
                name: "quantity",
                message: "How many would you like? [You can also leave BAMazon by pressing 'Q']",
                validate: function(value){
                    return value > 0 || value.toLowerCase() === "q";
                }
            }
        ]).then(function(value){
            checkIfShouldExit(value.quantity);
            var quantity = parseInt(value.quantity);

            if (quantity > product.stock_quantity){
                console.log("Insufficient Quantities, please select another quantity of units.");
                loadProducts();
            }
            else {
                makePurchase(product, quantity);
            }
        });
};

function makePurchase(product, quantity){
    connection.query(
        "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?",
        [quantity, product.id],
        function(err, res){
            if (err) return err;
            console.log("Successfully purchased!" + quantity + " " + product.product_name)
            loadProducts();
        }    
    );
};