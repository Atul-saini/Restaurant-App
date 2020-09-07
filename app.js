var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var Order = require("./models/order");
var User = require("./models/user");
var Info = require("./models/info");
var methodOverride = require("method-override");
var flash = require("connect-flash");
var sendgrid = require("@sendgrid/mail");

//Setting up SENDGRID
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);


//Calling routes
var restaurantRoutes = require("./routes/restaurant");
var authRoutes = require("./routes/index");

//mongoose.connect("mongodb://localhost/restaurant");
mongoose.connect(process.env.DATABASEURL);


app.use(require("express-session")({
    secret: "here it is",
    resave: false,
    saveUninitialized: false
}));

app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', express.static(__dirname + '/'));

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(restaurantRoutes);
app.use(authRoutes);

//Listeners 

const port = process.env.PORT || 3200;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

