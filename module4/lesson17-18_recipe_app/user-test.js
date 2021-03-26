"use strict";
const mongoose = require("mongoose"),
    User = require("./models/user"),
    Subscriber=require("./models/subscriber")

mongoose.connect(
        "mongodb+srv://dbUser:dbUserPassword@gettingstarted.jauwg.mongodb.net/recipe_db?retryWrites=true&w=majority",      
        {useNewUrlParser: true,useUnifiedTopology:true}
    );
mongoose.Promise = global.Promise;  

var testUser;
User.create({
    name: {
      first: "Jon",
      last: "Wexler"
    },
    email: "jon@jonwexler.com",
    password: "pass123",
    zipCode: 12345
  })
  .then((user)=>{
    testUser = user;
    return Subscriber.findOne({
        email: user.email
      });  
  })
  .then((subscriber)=>{
    testUser.subscribedAccount = subscriber;
    testUser.save().then(user => console.log("user updated"));
  })
  .catch((error)=>{
        console.log(error.message);
  })