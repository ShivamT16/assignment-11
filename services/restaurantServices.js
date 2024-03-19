const mongoose = require("mongoose");

const Restaurant = require("../models/restaurant");

const fs = require("fs");
const jsonData = fs.readFileSync("restaurant.json", "utf8");
const restaurantsData = JSON.parse(jsonData);

const seedDataBase = async () => {
  try {
    for (const restaurantData of restaurantsData) {
      const newRestaurant = new Restaurant({
        name: restaurantData.name,
        cuisine: restaurantData.cuisine,
        address: restaurantData.address,
        city: restaurantData.city,
        rating: restaurantData.rating,
        menu: restaurantData.menu,
        averageRating: restaurantData.averageRating,
      });

      await newRestaurant.save();
      console.log(`Restaurant "${newRestaurant.name}" seeded.`);
    }
    console.log("Database seeding complete.");
  } catch (error) {
    console.error("Error seeding database", error);
  } finally {
    mongoose.disconnect();
  }
};
// seedDataBase();

const f = {
  name: "Hotel",
  cuisine: "Indian",
  address: "Shop - 16, Gali Number-2",
  city: "Navada",
  rating: 3,
  menu: [
    {
      name: "Maharaja  Thali",
      price: 250,
      description: " Veg Thali",
      isVeg: true,
    },
  ],
  averageRating: 2,
};

const createRestaurant = async (newRestaurantData) => {
  try {
    const restaurant = new Restaurant(newRestaurantData);
    const savedRestaurant = await restaurant.save();
    console.log("New Restaurant", savedRestaurant);
    return savedRestaurant;
  } catch (error) {
    throw error;
  }
};
// createRestaurant(f);

const readRestaurant = async (restaurantName) => {
  try {
    const findRestaurant = await Restaurant.findOne({ name: restaurantName });
    if (findRestaurant) {
      console.log("Restaurant", findRestaurant);
      return findRestaurant;
    } else {
      console.log("not found");
    }
  } catch (error) {
    throw error;
  }
};
// readRestaurant("Hotel ");

const readAllRestaurants = async () => {
  try {
    const allRestaurants = await Restaurant.find({});
    console.log("All", allRestaurants);
    return allRestaurants;
  } catch (error) {
    throw error;
  }
};
// readAllRestaurants();

const readRestaurantsByCuisine = async (cuisineType) => {
  try {
    const restaurantsByCuisine = await Restaurant.find({
      cuisine: cuisineType,
    });
    if (restaurantsByCuisine.legth > 0) {
      console.log("cuisine", restaurantsByCuisine);
      return restaurantsByCuisine;
    } else {
      console.log("error");
    }
  } catch (error) {
    throw error;
  }
};
// readRestaurantsByCuisine("Indian");

const updateRestaurant = async (restaurantId, updatedData) => {
  try {
    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      updatedData,
      { new: true },
    );
    console.log(updatedRestaurant);
    return updatedRestaurant;
  } catch (error) {
    throw error;
  }
};
// updateRestaurant("65c787ebc899414ddbd03f52", { rating: 4 });

const deleteRestaurant = async (restaurantId) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    console.log(deletedRestaurant);
    return deletedRestaurant;
  } catch (error) {
    throw error;
  }
};
// deleteRestaurant("65c787efc899414ddbd03f57");

const searchRestaurantByLocation = async (restaurantLocation) => {
  try {
    const restaurantByLocation = await Restaurant.find({
      city: restaurantLocation,
    });
    console.log(restaurantByLocation);
    return restaurantByLocation;
  } catch (error) {
    throw error;
  }
};
// searchRestaurantByLocation("Dwarka");

const filterRestaurantByRating = async (restaurantRating) => {
  try {
    const restaurantByRating = await Restaurant.find({
      rating: { $gte: restaurantRating },
    });
    console.log(restaurantByRating);
    return restaurantByRating;
  } catch (error) {
    throw error;
  }
};
// filterRestaurantByRating(4);

const addDishToMenu = async (restaurantId, menuData) => {
  try {
    const restaurantWithNewMenu = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $push: { menu: menuData } },
      { new: true },
    );
    console.log(restaurantWithNewMenu);
    return restaurantWithNewMenu;
  } catch (error) {
    throw error;
  }
};

// addDishToMenu("65c787ebc899414ddbd03f52", {
//   name: "Malai Kofta",
//   price: 150,
//   description: "delicious",
//   isVeg: false,
// });

const removeDishFromMenu = async (restaurantId, dishName) => {
  try {
    const deletedDish = await Restaurant.findById(restaurantId);
    if (deletedDish) {
      deletedDish.menu = deletedDish.menu.filter(
        (item) => item.name !== dishName,
      );
      await deletedDish.save();
      console.log(deletedDish);
      return deletedDish;
    }
  } catch (error) {
    throw error;
  }
};

// removeDishFromMenu("65c787ebc899414ddbd03f52", "Malai Kofta");

const addRestaurantReviewAndRating = async (restaurantId, newReviews) => {
  try {
    const restaurantToBeUpdated = await Restaurant.findById(restaurantId);

    if (restaurantToBeUpdated) {
      const review = {
        user: newReviews.userId,
        text: newReviews.reviewText,
        rating: newReviews.rating,
      };
      restaurantToBeUpdated.reviews.push(review);

      await restaurantToBeUpdated.save();

      const updatedRestaurantWithReviewAndRating = await Restaurant.findById(
        restaurantId,
      ).populate("reviews.user", "username profilePictureUrl");
      console.log("Done", updatedRestaurantWithReviewAndRating);
      return updatedRestaurantWithReviewAndRating;
    } else {
      console.error("No Restaurant found.");
    }
  } catch (error) {
    throw error;
  }
};

// addRestaurantReviewAndRating("65c787ebc899414ddbd03f52", {
//   userId: "65c899f2d3a5cec7a482f136",
//   rating: 0,
//   reviewText: "",
// });

const getUserReviewsForRestaurant = async (restaurantId) => {
  try {
    const findRestaurant = await Restaurant.findById(restaurantId).populate(
      "reviews.user",
      "username profilePictureUrl",
    );
    const restaurantWithUserReview = findRestaurant.reviews;
    return restaurantWithUserReview;
  } catch (error) {
    throw error;
  }
};

// getUserReviewsForRestaurant("65c787ebc899414ddbd03f52");

module.exports = {
  seedDataBase,
  createRestaurant,
  readRestaurant,
  readAllRestaurants,
  readRestaurantsByCuisine,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurantByLocation,
  filterRestaurantByRating,
  addDishToMenu,
  removeDishFromMenu,
  addRestaurantReviewAndRating,
  getUserReviewsForRestaurant,
};
