"use strict";

const express = require("express"),
  app = express(),
  layouts = require("express-ejs-layouts"),
  router = express.Router(),
  mongoose = require("mongoose"),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  coursesController = require("./controllers/coursesController"),
  Subscriber = require("./models/subscriber"),
  methodOverride = require("method-override");
mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb+srv://dbUser:dbUserPassword@gettingstarted.jauwg.mongodb.net/recipe_db?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(layouts);
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());
app.use(homeController.logRequestPaths);

router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));  

app.use("/", router)
router.get("/", homeController.index);
router.get("/contact", homeController.getSubscriptionPage);

router.get("/users", usersController.index, usersController.indexView);
router.get("/subscribers", subscribersController.index, subscribersController.indexView);
router.get("/courses", coursesController.index, coursesController.indexView);

router.post("/subscribe", subscribersController.saveSubscriber);

router.get("/users/new", usersController.new);
router.post("/users/create", usersController.create,usersController.redirectView); 
router.get("/users/:id",usersController.show, usersController.showView)
router.get("/users/:id/edit",usersController.show,usersController.editView)
//router.get("/users/:id/edit",usersController.edit)
router.put("/users/:id/update", usersController.update,usersController.redirectView);
router.delete("/users/:id/delete", usersController.delete, usersController.redirectView)

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
