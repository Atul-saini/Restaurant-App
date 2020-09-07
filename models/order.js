var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
    username: String,
    name: String,
    value: { type: Number, default: 0 }
});

var Order = mongoose.model("Order", orderSchema);
module.exports = Order;