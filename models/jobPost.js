const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const JobPostSchema = new mongoose.Schema(
    {
       
        recruiter_id: { 
            type: Number, 
            required: true, 
            ref: "users"  // Reference to Users table
        },
       
        job_title: { type: String,  },
        description: { type: String,  },
        recruiter_name: { type: String, required: true, ref:"users" },
        company_name: { type: String, },
        company_details:{type: String,},// intern ,full-time, freelancer,part-time
        employee_role: { type: String,
             
             enum: ["Intern", "Full-time", "Freelancer", "Part-time"]
         },// intern ,full-time, freelancer,part-time
        location: { type: String,},
        skills: { type: String,}, 
        salary_range: { type: String, },
        job_type: { type: String,
             required: true,
             enum: ["Remote", "On-site", "Hybrid"] }, // e.g.,remote, on-site
        vacancy:{type:Number},
        qualification: { type: String,  },// e.g. BE-IT,master in IT...
        posted_date: { type: Date, default: Date.now }, // Default: current date
        responsibility: { type: String, },
        experience: { type: String,
            match: /^[0-9]+(\+|-)?\d*\s*years$/, // Enforces format like "1-3 years" or "5+ years"
            required: true },
        expire_date: { type: Date, }// expire date 
    },
    { timestamps: true

     }
);

// Auto-increment job_id
JobPostSchema.plugin(AutoIncrement, { inc_field: "job_id" });

module.exports = mongoose.model("jobpost", JobPostSchema);
