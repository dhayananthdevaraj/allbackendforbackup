const express = require("express");
const taskController = require("../controllers/taskController");
const { validateToken } = require("../authUtils");
const router = express.Router();

router.post("/getAllTasks", taskController.getAllTasks);
router.get("/getTaskById/:id", taskController.getTaskById);
router.post("/getTasksByUserId", taskController.getTasksByUserId);
router.post("/addTask", taskController.addTask);
router.put("/updateTask/:id", taskController.updateTask);
router.delete("/deleteTask/:id", taskController.deleteTask);

module.exports = router;
