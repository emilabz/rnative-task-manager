// backend/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Task = require("../models/Task");

// @desc    Create a new task
// @route   POST /tasks
// @access  Private
router.post("/", protect, async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({
      user: req.user._id, // Access user ID from the protect middleware
      title,
      description,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @desc    Get all tasks for the logged-in user
// @route   GET /tasks
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }); // Get tasks only for the current user
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @desc    Get a specific task
// @route   GET /tasks/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(task);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" }); // Handle invalid ObjectIDs
    }

    res.status(500).send("Server error");
  }
});

// @desc    Update a task
// @route   PUT /tasks/:id
// @access  Private
router.put("/:id", protect, async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" }); // Handle invalid ObjectIDs
    }

    res.status(500).send("Server error");
  }
});

// @desc    Delete a task
// @route   DELETE /tasks/:id
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if the task belongs to the logged-in user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task removed" });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ message: "Task not found" }); // Handle invalid ObjectIDs
    }

    res.status(500).send("Server error");
  }
});

module.exports = router;
