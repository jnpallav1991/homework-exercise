"use strict";
// Import needed modules
const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts");

const mongoose = require("mongoose"); 
const Subscriber = require("./models/subscriber");
const Recipe = require("./models/recipe");

const subscribersController = require("./controllers/subscribersController");

mongoose.connect(
  "mongodb+srv://dbUser:dbUserPassword@gettingstarted.jauwg.mongodb.net/recipe_db?retryWrites=true&w=majority",      
  {useNewUrlParser: true,useUnifiedTopology:true}
);
const db = mongoose.connection;  

//mangoose connection
db.once("open", () => {                                             1
  console.log("Successfully connected to MongoDB using Mongoose!");
});


// //creating schema
// const subscriberSchema = mongoose.Schema({     
//   name: String,                                
//   email: String,
//   zipCode: Number
// });

// const Subscriber = mongoose.model("Subscriber", subscriberSchema);

//Statements to create and save models

// var subscriber1 = new Subscriber({
//   name: "Jon Wexler",
//   email: "jon@jonwexler.com"
// });

// subscriber1.save((error, savedDocument) => {     
//   if (error) console.log(error);                 
//   console.log(savedDocument);                    
// });

// //same way as above but different way of doing
// Subscriber.create(
//   {
//     name: "Pallav Jain",
//     email: "pallav.jain@aggiemail.usu.edu"
//   },
//   function (error, savedDocument) {              
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );

Recipe.create({
  title:"Driven cakes",
  cost:54
},
function(error,savedDocument){
  if (error) console.log(error);
  console.log(savedDocument);
}
);

var myQuery = Subscriber.findOne({
  name: "Jon Wexler"
})
.where("email", /wexler/);
myQuery.exec((error, data) => {
if (data) console.log(data.name);
});     


// Set application variables
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Set up application middleware
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(homeController.logRequestPaths);

//  Routes for testing
app.get("/name", homeController.respondWithName);
app.get("/items/:vegetable", homeController.sendReqParam);


// Routes for home page, courses page, and contact page
app.get("/", homeController.index);
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showContact);

app.get("/contact", subscribersController.getSubscriptionPage);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.post("/subscribe", subscribersController.saveSubscriber);




// Set up error handling middleware at the end
// These should only be applied if no other routes apply
app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);


// Launch the server
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
