const Job = require("../models/job");

const createJobPost = async (req, res) => {
    try {
        const { title, company, location, salary, description } = req.body;

        // Create new job post
        const job = new Job({ title, company, location, salary, description });
        await job.save();

        res.status(201).json({
            status: 201,
            message: "Job posted successfully",
            data: job
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = { createJobPost };
