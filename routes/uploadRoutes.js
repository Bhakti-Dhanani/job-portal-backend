const express = require("express");
const uploadResume = require("../controllers/uploadController"); 
const upload = require("../config/multerconfig");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

// Upload Resume Route
router.post("/upload",authMiddleware, upload.single("resume"), uploadResume);

module.exports = router;
