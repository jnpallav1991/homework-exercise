const mongoose = require("mongoose"); 

//creating schema
const subscriberSchema = mongoose.Schema({     
    name: String,                                
    email: String,
    zipCode: Number
  });
  
  //const Subscriber = mongoose.model("Subscriber", subscriberSchema);
  module.exports = mongoose.model("Subscriber", subscriberSchema);
  