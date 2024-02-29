const express = require("express");
const {authenticateJwt} = require("../middleware/auth");
const {User, Admin} = require("../db/db")
//TODO: try removing the second DB


const router = express.Router();

//have 2 secrets, but a authJWT func
router.get("/me", authenticateJwt, (req, res) => {

    if (req.user) {
        const username = req.user.username;
        console.log("yes, req.user exists, it is: ", req.user)
        if (req.userProfile === "admin") {
            const admin = Admin.findOne({ username })
            if (!admin) {
                return res.status(403).json({ message: "Admin does not exist" })
            }
            return res.json({ username, userProfile: req.userProfile });
        } else if (req.userProfile === "user") {
            const user = User.findOne({ username })
            if (!user) {
                return res.status(403).json({ message: "User does not exist" })
            }
            return res.json({ username, userProfile: req.userProfile });
        } else {
            return res.status(403).json({ message: "Account does not exist" });
        }
    }


})

module.exports = router;