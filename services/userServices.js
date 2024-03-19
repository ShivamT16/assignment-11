const mongoose = require("mongoose");

const User = require("../models/user");

const signup = async (userDetails) => {
  try {
    const user = new User(userDetails);

    const allDetails =
      user.username &&
      user.nickname &&
      user.profilePictureUrl &&
      user.email &&
      user.password;

    if (allDetails) {
      const newUser = await user.save();
      console.log("New User Created", newUser);
      return newUser;
    } else {
      console.log("Fill all details");
    }
  } catch (error) {
    throw error;
  }
};
// signup({
//   username: "Helloworld",
//   nickname: "hw",
//   profilePictureUrl: "/example.com",
//   email: "example@com",
//   password: "ece",
// });

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      console.log("User Logged in", user);
      return user;
    } else {
      console.log("Credentials Invalid");
    }
  } catch (error) {
    throw error;
  }
};
// login("example@com", "ece");

module.exports = { signup, login };
