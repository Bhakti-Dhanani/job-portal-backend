const Resume = require("../models/resumes");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded or invalid file type." });
    }
    const  {user_id } = req.user; // Get user_id from request
    
    const file_url = req.file.path || req.file.secure_url; // Get Cloudinary file URL

    // Save to MongoDB
    const newResume = new Resume({ user_id, file_url });
    await newResume.save();

    res.status(201).json({ message: "Resume uploaded successfully", resume: newResume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Error uploading resume" });
  }
}
module.exports = uploadResume;