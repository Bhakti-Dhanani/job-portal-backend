const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema({
    user_id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {  type: Number, 
        enum: [1, 2, 3], // 1: Admin, 2: Recruiter, 3: Candidate
        default: 3, required: true  },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
