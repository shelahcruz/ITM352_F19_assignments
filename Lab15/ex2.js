var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");
var qs = require('querystring');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(myParser.urlencoded({ extended: true }));
var session = require('express-session');


//app.use(session({secret: "ITM352 Rocks!"}));

app.get('/', function(req, res){
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});


app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
        <body>
        <form action="" method="POST">
        <input type="text" name="username" size="40" placeholder="enter username" ><br />
        <input type="password" name="password" size="40" placeholder="enter password"><br />
        <input type="submit" value="Submit" id="submit">
        </form>
        </body>
    `;
    response.send(str);
});


app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
    console.log(user_product_quantities);
    the_username = request.body.username;
    if (typeof users_reg_data[the_username] != 'undefined') {
        if (users_reg_data[the_username].password == request.body.password) {
            // make the query string of prod quant needed for invoice
            theQuantQuerystring = qs.stringify(user_product_quantities);
            //response.redirect('/invoice.html?' + theQuantQuerystring);
           msg = '';
            if(typeof resquest.session.last_login != 'undefined') {
            var msg = `You last logged in on ${resquest.session.last_login}`;
            var now = new Date();
          } else {
              now = 'first login!';
          }
            resquest.session.last_login = now;
            response.send(msg + '<br>' + `${the_username} is logged in at ${now}`);
        } else {
            response.redirect('/login');
        }
    }
});


app.get("/set_cookie", function (request, response) {
    response.cookie('myname', 'Shelah Cruz', {expire: 5 * 1000 + Date.now()}).send('cookie set');
});


app.get("/use_session", function (request, response) {
    response.cookie('myname', 'Shelah Cruz', {expire: 5 * 1000 + Date.now()}).send('cookie set');
});


app.get("/use_cookie", function (request, response) {
    output = "No myname cookie found!";
    if (typeof request.cookies.myname != 'undefined') {
        your_name = request.cookies.myname;
        output = `Welcome to the Use Cookie Page ${your_name}`;
    }
    response.send(output);
});



app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
        <body>
        <form action="" method="POST">
        <input type="text" name="username" size="40" placeholder="enter username" ><br />
        <input type="password" name="password" size="40" placeholder="enter password"><br />
        <input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
        <input type="email" name="email" size="40" placeholder="enter email"><br />
        <input type="submit" value="Submit" id="submit">
        </form>
        </body>
    `;
    response.send(str);
});


app.post("/register", function (request, response) {
    // process a simple register form

    // validate regiatation data

    // all good so save the new user
    username = request.body.username;
    users_reg_data[username] = {};
    users_reg_data[username].password = request.body.password;
    users_reg_data[username].email = request.body.email;

    fs.writeFileSync(filename, JSON.stringify(users_reg_data));

    response.send(`${username} registered!`);

});

app.use(express.static('.'));
app.listen(8080, () => console.log(`listening on port 8080`));