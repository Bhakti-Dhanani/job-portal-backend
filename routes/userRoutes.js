const express = require("express");
const User = require("../models/user");
const {userRegistration,userLogin} = require("../controllers/user.controller");
const router = express.Router();
// const userLogin = require("../controllers/user.controller");

// REGISTER USER
router.post("/register" , userRegistration);

// LOGIN USER
router.post("/login", userLogin);

// GET ALL USERS (Protected)
router.get("/getUsers", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
