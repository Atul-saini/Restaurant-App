var mongoose=require("mongoose");
var Order=require("./order");
var passportLocalMongoose=require("passport-local-mongoose")

var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order'
    }]
});

userSchema.plugin(passportLocalMongoose);

var User=mongoose.model("User",userSchema);

module.exports=User;