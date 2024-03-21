const Restaurant = require("../models/restaurant");

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

const readAllRestaurants = async () => {
  try {
    const allRestaurants = await Restaurant.find({});
    console.log("All", allRestaurants);
    return allRestaurants;
  } catch (error) {
    throw error;
  }
};

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

const deleteRestaurant = async (restaurantId) => {
  try {
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
    console.log(deletedRestaurant);
    return deletedRestaurant;
  } catch (error) {
    throw error;
  }
};

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

module.exports = {
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
