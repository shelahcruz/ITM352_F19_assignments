// Shelah Marie Cruz
const querystring = require('querystring'); //require that the server responds to any errors in the invoice (line 33)

var express = require('express'); //code for server (got this from Lab13)
var myParser = require("body-parser"); //code for server (got this from Lab13)
var products = require("./public/product_data.js"); //accessing data from javascript file
var app = express(); //got this from Lab13

app.all('*', function (request, response, next) {
   console.log(request.method + ' to ' + request.path);
   next();
});

app.use(myParser.urlencoded({ extended: true }));

//this goes to invoice if quantity values are good and if not, it redirect back to order page (got it from Lab13)
app.get("/process_page", function (request, response) {
   
    // it checks for valid quantities
   params = request.query;
   console.log(params);
   if (typeof params['purchase_submit'] != 'undefined') {
      has_errors = false; // assume that quantity values are valid
      total_qty = 0; // checks if there are values, must check if total > 0
      for (i = 0; i < products.length; i++) {
         if (typeof params[`quantity${i}`] != 'undefined') {
            a_qty = params[`quantity${i}`];
            total_qty += a_qty;
            if (!isNonNegInt(a_qty)) {
               has_errors = true; // this sees if there is invalid data
            }
         }
      }
      qstr = querystring.stringify(request.query);
      // redirect to invoice if quantity data is valid or respond to invalid data
      if (has_errors || total_qty == 0) {
         //redirect to products page if quantity data is invalid
         qstr = querystring.stringify(request.query);
         response.redirect("products_page.html?" + qstr);
      } else { //the quantity data is okay for the invoice
         response.redirect("invoice.html?" + qstr);
      }
   }
});
//I got the code from Lab13
//if quantity data valid, send them to the invoice
function isNonNegInt(q, returnErrors = false) {
   errors = []; // assume that quantity data is valid 
   if (q == "") { q = 0; }
   if (Number(q) != q) errors.push('Not a number!'); //check if value is a number
   if (q < 0) errors.push('Negative value!'); //check if value is a positive number
   if (parseInt(q) != q) errors.push('Not an integer!'); //check if value is a whole number
   return returnErrors ? errors : (errors.length == 0);
}

app.use(express.static('./public'));
app.listen(8080, () => console.log(`listening on port 8080`));