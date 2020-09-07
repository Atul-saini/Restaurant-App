var express=require("express");
var router=express.Router({mergeParams:true});
var User=require("../models/user");
var Order=require("../models/order");
var passport=require("passport");
var Info=require("../models/info");
var flash=require("connect-flash");
var sendgrid=require("@sendgrid/mail");

//Setting up SENDGRID
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

router.use(flash());


//Login routes
router.get("/login",(req,res)=>{
    res.render("login");
});

router.post("/login",passport.authenticate("local",
{
    successRedirect:"/menu",
    failureRedirect:"/login"
}),(req,res)=>{
});

//Logout route
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Logged you out successfully");
    res.redirect("/");
});

//Register routes
router.get("/register",(req,res)=>{
    res.render("register");
});

router.post("/register",(req,res)=>{
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{
        if(err){
            return res.render("register");
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.render("menu");
                user.email=req.body.email;
            });
        }
    });
});

//Middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error","Please log in first");
        res.redirect("/login");
    }
};





module.exports=router;