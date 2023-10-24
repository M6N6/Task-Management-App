const express = require("express");
const connection = require("../connection");
const auth = require("../services/auth");
const role = require("../services/checkRole");

const router = express.Router();

router.post("/add", auth.authenticate, role.checkRole, (req, res) => {
    let task = req.body;
    let query =
        'insert into task (taskName, taskStartDate, taskEndDate, status) values(?,?,?,?)';

    connection.query(
        query,
        [task.taskName, task.startDate, task.endDate, task.status],
        (err, results) => {
            if (!err) {
                return res.status(200).json({ message: "Product added successfully" });
            } else {
                return res.status(500).json({ err });
            }
        }
    );
});

router.get("/get", auth.authenticate, (req, res, next) => {
    let status = req.body
    let query =
        "select * from task";
    connection.query(query, [status], (err, results) => {
        if (!err) {
            return res.status(200).json({ data: results });
        } else {
            return res.status(500).json({ err });
        }
    });
});

router.get("/getByID/:id", (req, res, next) => {
    const id = req.params.id;
    let query = "select * from task where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            return res.status(200).json({ data: results[0] });
        } else {
            return res.status(500).json({ err });
        }
    });
});

router.patch("/update", auth.authenticate, role.checkRole, (req, res, next) => {
    let task = req.body;
    let query =
        "update task set taskName=?, taskStartDate=?, taskEndDate=?, status=? where id=?";
    connection.query(
        query,
        [
            task.taskName,
            task.startDate,
            task.endDate,
            task.status,
            task.id,
        ],
        (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "Task ID not found" });
                }
                return res
                    .status(200)
                    .json({ message: "Task updated successfully" });
            } else {
                return res.status(500).json({ err });
            }
        }
    );
});

router.delete(
    "/delete/:id",
    auth.authenticate,
    role.checkRole,
    (req, res, next) => {
        const id = req.params.id;
        let query = "delete from task where id=?";
        connection.query(query, [id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "Task ID not found" });
                }
                return res
                    .status(200)
                    .json({ message: "Task deleted successfully" });
            } else {
                return res.status(500).json({ err });
            }
        });
    }
);

router.patch(
    "/updateStatus",
    auth.authenticate,
    role.checkRole,
    (req, res, next) => {
        const task = req.body;
        let query = "update task set active_status=? where id=?";
        connection.query(query, [task.status, task.id], (err, results) => {
            if (!err) {
                if (results.affectedRows == 0) {
                    return res.status(404).json({ message: "Task ID not found" });
                }
                return res
                    .status(200)
                    .json({ message: "Task status has been updated successfully" });
            } else {
                return res.status(500).json({ err });
            }
        });
    }
);

module.exports = router;
