import mongoose from "mongoose";

// Define mongoose schemas
const userSchema = new mongoose.Schema({
    username: {type: String},
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });
  
const orgSchema = new mongoose.Schema({
    username: String,
    password: String,
    createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
    //TODO: Add created courses
  });
  
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    ownerId: String,
  });

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', orgSchema);
const Course = mongoose.model('Course', courseSchema);
  
export { User, Admin, Course };
