const express = require("express");
const { authenticateJwt, USERSECRET } = require("../middleware/auth");
const { User, Course } = require("../db/db");
const jwt = require("jsonwebtoken");

const router = express.Router();

//TODO: add comments everywhere

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, USERSECRET, {
      expiresIn: "1d",
    });
    res.json({ message: "User created successfully", token });
    console.log({ message: "User created successfully" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, USERSECRET, {
      expiresIn: "1d",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  //list out a single  course
  const course = await Course.findById(req.params.courseId);
  if (course) {
    res.json({ course });
  } else {
    res.status(405).json({ message: "Course not found" });
  }
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  // purchase a course
  console.log("about to buy a course");
  const course = await Course.findById(req.params.courseId);
  console.log("you are about to purchase this course: ", course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    console.log("while purchasing the course, the user is: ", user);
    if (user) {
      const alreadyPurchased = user.purchasedCourses.some((purchasedCourse) =>
        purchasedCourse.equals(course._id)
      );
      if (alreadyPurchased) {
        console.log("user has already purchased this course");
        return res
          .status(409)
          .json({ message: "User has already purchased this course" });
      }
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  //list purchased courses
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses" //means to list out the "purchasedCourses" of each user
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] }); //if user.purchasedCourses is empty, return an empty array
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

router.delete("/courses/:courseId", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  const courseIdToRemove = req.params.courseId;
  console.log("while deleting, user is: ", user);
  if (user) {
    User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { purchasedCourses: courseIdToRemove } },
      { new: true },).then((response)=>{
        console.log("updatedUser is: ", response);
        res.status(200).json({ message: "Deleted!" });
      }).catch((error)=>{
        console.log(
          "encountered an error while deleting the purchase: ",
          error
        );
        res.json(407).json({ message: "Internal server error" });
      })
      }
});

module.exports = router;
