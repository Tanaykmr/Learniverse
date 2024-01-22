const mongoose = require("mongoose");
const express = require("express");
const { User, Course, Admin } = require("../db");
//TODO: try removing User from above
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");
//TODO: try removing "auth" from above since middleware contains only 1 file
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ message: "Admin does not exist" });
  } else {
    res.json({ username: admin.username });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingAdmin = await Admin.findOne({ username });

    if (existingAdmin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username, password };
      const newAdmin = new Admin(obj);
      await newAdmin.save();
      console.log("Admin created successfully");
      res.json({ message: "Admin created successfully" });
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  console.log("username: ", username, " password: ", password);
  if (!admin || admin == null) {
    res.status(403).json({ message: "Invalid username or password" });
  } else {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token: token });
    console.log({ message: "Logged in successfully", token });
  }
});

//create courses
router.post("/courses", authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

//update course by courseId
router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  console.log("courseId: ", req.params.courseId);
  try {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body,{new: true,});
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(501).json({ message: "Internal Server Error" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

//find course by courseId
router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    res.json({ course });
  } else {
    res.status(405).json({ message: "Course not found" });
  }
});

module.exports = router;
