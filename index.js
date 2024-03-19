const express = require("express");
const app = express();

const restaurantRouter = require("./routers/restaurant.router");
const userRouter = require("./routers/user.router");
app.use(express.json());

require("./db");

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Restaurant API documentation. The documenation is prepared to provide your restaurant platform a powerful mangement systems with the APIs. It is designed in such a way that developers can easily adapt and use these APIs for various functions such as create, delete, modify and more.",
  );
});

app.use("/user", userRouter);
app.use("/restaurants", restaurantRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went wrong " });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
