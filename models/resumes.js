const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); 

const ResumeSchema = new mongoose.Schema(
    {
        resume_id: { type: String, default: uuidv4, unique: true }, // Auto-generate UUID
        user_id: { type: String, required: true, ref: "users" }, // Foreign key reference to users
        file_url: { type: String, required: true }, // Path to stored resume
        parsed_data: { type: Object, default: {} }, // JSON with extracted data (skills, education, etc.)
    },
    { timestamps: true } 
);

module.exports = mongoose.model("resume", ResumeSchema);
