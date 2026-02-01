const mongoose = require("mongoose");

// name: "Focaccia",
//     ingredients: "Bread with italian olive oil and rosemary",
//     price: 6,
//     photoName: "pizza_images/focaccia.jpg",
//     soldOut: false,
const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cannot be nore than 20 characters"],
  },
  ingredients: {
    type: String,
    required: [true, "must provide ingredients"],
    trim: true,
    maxlength: [200, "name cannot be nore than 20 characters"],
  },
  price: {
    type: Number,
    required: [true, "must provide price"],
    trim: true,
  },
  photoName: {
    type: String,
    required: [true, "must provide photoname"],
    trim: true,
  },
  soldOut: {
    type: Boolean,
    required: [true, "must provide soldout value"],
    default: false,
  },
});
module.exports = mongoose.model("Pizza", pizzaSchema);
