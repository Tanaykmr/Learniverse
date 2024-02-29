const mongoose = require("mongoose");
const express = require("express");
const { User, Course, Admin } = require("../db/db");
//TODO: try removing User from above
const jwt = require("jsonwebtoken");
const { ADMINSECRET } = require("../middleware/auth");
//TODO: try removing "auth" from above since middleware contains only 1 file
const { authenticateJwt } = require("../middleware/auth");

const router = express.Router();

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
      const token = jwt.sign({ username, role: "admin" }, ADMINSECRET, {
        expiresIn: "1d",})
      res.json({ message: "Admin created successfully", token: token});
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });

  if (!admin || admin == null) {
    res.status(403).json({ message: "Invalid username or password" });
  } else {
    const token = jwt.sign({ username, role: "admin" }, ADMINSECRET, {
      expiresIn: "1d",
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
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    console.error("Error editing course:", error);
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

router.delete("/courses/:courseId", authenticateJwt, async(req, res) => {
  try{
    const deleteStatus = await Course.deleteMany({_id: req.params.courseId});
    console.log("deleteStatus is: ", deleteStatus);
    res.status(200).json({message: "Deleted!"})
  }
  catch(error){
    console.log("encountered an error while deleting the course: ", error)
    res.json(407).json({message: "Internal server error"})
    // search WriteResult mongoDB for more info
  }
})

// implemented this quick solution to have a uniform image in all the courses xD
// router.put("/changeimg/:courseId", authenticateJwt, async (req, res) => {
//   console.log("courseId: ", req.params.courseId);
//   try {
//     const course = await Course.findByIdAndUpdate(
//       req.params.courseId,
//       req.body,
//       { new: true }
//     );
//     console.log("img changed for ", course.title, " id: ", course._id);
//     res.json("done");
//   } catch (error) {
//     console.log("encountered an error");
//     res.status(406).json({message: "encountered an error"});
//   }
// });

module.exports = router;
