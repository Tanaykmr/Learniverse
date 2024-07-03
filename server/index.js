// const express = require('express');
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import catchAllRouter from "./routes/catchAll.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.get("*", catchAllRouter);

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect(
	// <insert mongodb link here>
	"mongodb+srv://ClusterMaster:wtAuGNFqpatanQNW@cluster01.bktt4jz.mongodb.net/coursesDB",
);
app.listen(3000, () => console.log("Server running on port http://localhost:3000"));
