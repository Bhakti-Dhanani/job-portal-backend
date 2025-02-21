const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");

// Allowed file types
const allowedMimeTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

// Multer Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new Error("Invalid file type. Only PDF, DOC, and DOCX are allowed.");
    }

    return {
      folder: "resumes", // Store in "resumes" folder
      resource_type: "auto", // Detect file type
      format: file.mimetype === "application/msword" ? "doc" :
              file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "docx" :
              "pdf", // Convert file type accordingly
      public_id: `${Date.now()}-${file.originalname}`, // Unique file name
    };
  },
});

// Multer Middleware
const upload = multer({ storage });

module.exports = upload;
