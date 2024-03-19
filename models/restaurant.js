const mongoose = require("mongoose");

const User = require("../models/user");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  cuisine: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  menu: [
    {
      name: String,
      price: Number,
      description: String,
      isVeg: Boolean,
    },
  ],
  averageRating: { type: Number, default: 0 },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: String,
      rating: Number,
    },
  ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
