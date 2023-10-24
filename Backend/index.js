const express = require("express");
const cors = require("cors");
const connection = require("./connection");
const userRoute = require("./routes/user");
const dashboardRoute = require("./routes/dashboard");
const taskRoute = require("./routes/task");

const app = express();

app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/user", userRoute);
app.use("/dashboard", dashboardRoute);
app.use("/task", taskRoute);

module.exports = app;
