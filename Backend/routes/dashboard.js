const express = require("express");
const connection = require("../connection");
const auth = require("../services/auth");
const role = require("../services/checkRole");

const router = express.Router();

router.get("/details", auth.authenticate, (req, res, next) => {
  let userCount;
  let activeTaskCount;

  let queryUserCount = "select count(id) as userCount from user";
  connection.query(queryUserCount, (err, results) => {
    if (!err) {
      userCount = results[0].userCount;
    } else {
      return res.status(500).json({ err });
    }
  });

  let queryActiveTask = "select count(id) as activeTaskCount from task";
  connection.query(queryActiveTask, (err, results) => {
    if (!err) {
      activeTaskCount = results[0].activeTaskCount;
      let data = {
        user: userCount,
        active: activeTaskCount
      };
      return res.status(200).json({ data });
    } else {
      return res.status(500).json({ err });
    }
  });
});

module.exports = router;
