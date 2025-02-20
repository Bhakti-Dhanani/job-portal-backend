const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const JobPostSchema = new mongoose.Schema(
    {
        job_id: { type: Number, unique: true }, // Auto-incremented IDgit 
        recruiter_id: { 
            type: Number, 
            required: true, 
            ref: "users"  // Reference to Users table
        },
       
        job_title: { type: String, required: true },
        description: { type: String, required: true },
        recruiter_name: { type: String, required: true, ref:"users" },
        employee_role: { type: String, required: true },// intern ,full-time, freelancer,part-time
        location: { type: String, required: true },
        skills: { type: String, required: true }, 
        salary_range: { type: String, required: true },
        job_type: { type: String, required: true }, // e.g.,remote, on-site
        qualification: { type: String, required: true },// e.g. BE-IT,master in IT...
        posted_date: { type: Date, default: Date.now }, // Default: current date
        responsibility: { type: String, required: true },
        expire_date: { type: Date, required: true }// expire date 
    },
    { timestamps: true

     }
);

// Auto-increment job_id
JobPostSchema.plugin(AutoIncrement, { inc_field: "job_id" });

module.exports = mongoose.model("jobpost", JobPostSchema);
