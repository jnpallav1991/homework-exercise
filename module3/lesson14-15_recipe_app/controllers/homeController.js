"use strict";

var courses = [
  {
    title: "Event Driven Cakes",
    cost: 50
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25
  },
  {
    title: "Object Oriented Orange Juice",
    cost: 10
  }
];

exports.index = (req, res) => {
  res.render("index");
};

exports.showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses
  });
};

exports.showContact = (req, res) => {
  res.render("contact");
};

exports.postContact = (req, res) => {
  res.render("thanks");
};

exports.logRequestPaths = (req, res, next) => {
  console.log(`request made to: ${req.url}`);
  next();
};

exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}`);
};

exports.respondWithName = (req, res) => {
  res.render("index");
};

exports.showSubscribers=(req,res)=>{
  res.render("subscribers",{
    subscribers: req.data
  });
}
