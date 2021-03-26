const mongoose = require("mongoose"); 

//creating schema
const recipeSchema = mongoose.Schema({     
    title: String,                                
    cost: Number
  });

  module.exports = mongoose.model("Recipe", recipeSchema);