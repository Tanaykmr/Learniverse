const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const catchAllRouter = require("./routes/catchAll")

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.get("*", catchAllRouter);

// Connect to MongoDB
// DONT MISUSE THIS THANKYOU!!
mongoose.connect(
  // <insert mongodb link here>
  "mongodb+srv://ClusterMaster:wtAuGNFqpatanQNW@cluster01.bktt4jz.mongodb.net/coursesDB"
  );
app.listen(3000, () => console.log('Server running on port http://localhost:3000'));
