const express = require("express");
const restaurantRouter = express.Router();
const Restaurant = require("../models/restaurant");

const {
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
} = require("../services/restaurantServices");

restaurantRouter.use(express.json());

restaurantRouter.post("/", async (req, res) => {
  try {
    const savedRestaurant = await createRestaurant(req.body);
    res
      .status(201)
      .json({ message: "New restaurant added", restaurant: savedRestaurant });
  } catch (error) {
    res.status(500).json({ error: "Failed to add new restaurant" });
  }
});

restaurantRouter.get("/search", async (req, res) => {
  try {
    const restrauntByLocation = await searchRestaurantByLocation(
      req.query.location,
    );

    if (restrauntByLocation) {
      res
        .status(200)
        .json({ message: "Restaurant found", restaurant: restrauntByLocation });
    } else {
      res.status(404).json({ error: "Restaurant not found on this location" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding restaurant" });
  }
});

restaurantRouter.get("/:name", async (req, res) => {
  try {
    const restaurant = await readRestaurant(req.params.name);
    if (restaurant) {
      res
        .status(200)
        .json({ message: "Restaurant found", restaurant: restaurant });
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding restaurant" });
  }
});

restaurantRouter.get("/", async (req, res) => {
  try {
    const allRestaurants = await readAllRestaurants();
    if (allRestaurants) {
      res
        .status(200)
        .json({ message: "All Restaurants", restaurants: allRestaurants });
    } else {
      res.status(404).json({ error: "Restaurants not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding restaurants" });
  }
});

restaurantRouter.get("/cuisine/:cuisineType", async (req, res) => {
  try {
    const restaurantByCuisine = await readRestaurantsByCuisine(
      req.params.cuisineType,
    );
    if (restaurantByCuisine) {
      res.status(200).json({
        message: "Restaurants found",
        restaurants: restaurantByCuisine,
      });
    } else {
      res.status(404).json({ error: "Restaurants not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding restaurants" });
  }
});

restaurantRouter.post("/:restaurantId", async (req, res) => {
  try {
    const updatedRestaurant = await updateRestaurant(
      req.params.restaurantId,
      req.body,
    );
    if (updatedRestaurant) {
      res.status(201).json({
        message: "Restaurant found",
        restaurants: updatedRestaurant,
      });
    } else {
      res.status(404).json({ error: "Restaurant not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding restaurants" });
  }
});

restaurantRouter.delete("/:restaurantId", async (req, res) => {
  try {
    const deletedRestaurant = await deleteRestaurant(req.params.restaurantId);
    if (deletedRestaurant) {
      res.status(201).json({
        message: "Restaurant deleted",
        deleted_Restaurant: deletedRestaurant,
      });
    } else {
      res.status(404).json({ error: "Restaurant not deleted" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting restaurant" });
  }
});

restaurantRouter.get("/rating/:minRating", async (req, res) => {
  try {
    const restaurantByRating = await filterRestaurantByRating(
      req.params.minRating,
    );
    if (restaurantByRating) {
      res.status(200).json({
        message: "Restaurants found",
        restaurants: restaurantByRating,
      });
    } else {
      res.status(404).json({ error: "Restaurants not found for given rating" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding restaurants" });
  }
});

restaurantRouter.post("/:restaurantId/menu", async (req, res) => {
  try {
    const restaurantWithNewMenu = await addDishToMenu(
      req.params.restaurantId,
      req.body,
    );
    if (restaurantWithNewMenu) {
      res.status(201).json({
        message: "Restaurant with updated menu",
        restaurants: restaurantWithNewMenu,
      });
    } else {
      res.status(404).json({ error: "Restaurant not found to update menu" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding restaurant" });
  }
});

restaurantRouter.delete("/:restaurantId/menu/:dishName", async (req, res) => {
  try {
    const deletedDish = await removeDishFromMenu(
      req.params.restaurantId,
      req.params.dishName,
    );
    if (deletedDish) {
      res.status(201).json({
        message: "Dish from menu deleted",
        deletedDish: deletedDish,
      });
    } else {
      res.status(404).json({ error: "Deleting dish from menu failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting dish from menu" });
  }
});

restaurantRouter.post("/:restaurantId/reviews", async (req, res) => {
  try {
    const reviewAndRating = await addRestaurantReviewAndRating(
      req.params.restaurantId,
      req.body,
    );
    if (reviewAndRating) {
      res.status(201).json({
        message: "Reviews and ratings added",
        reviewAndRating: reviewAndRating,
      });
    } else {
      res.status(404).json({ error: "Adding reviews and ratings failed" });
    }
  } catch {
    res.status(500).json({ error: "Error adding reviews and ratings" });
  }
});

restaurantRouter.get("/:restaurantId/reviews", async (req, res) => {
  try {
    const restaurantWithUserReview = await getUserReviewsForRestaurant(
      req.params.restaurantId,
    );

    if (restaurantWithUserReview) {
      res.status(200).json({
        message: "Reviews of restaurant",
        reviews: restaurantWithUserReview,
      });
    } else {
      res.status(404).json({ error: "Finding reviews failed" });
    }
  } catch {
    res.status(500).json({ error: "Error Finding reviews" });
  }
});

module.exports = restaurantRouter;
