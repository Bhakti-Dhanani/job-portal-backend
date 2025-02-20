const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userRegistration = async (req, res) => {
    try {
        console.log("Received Request Body:", req.body); 
        const { name, email, password, role } = req.body;

        // Check if email already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "Email already exists" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create New User
        user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        // Remove password from response for security
        const { password: _, ...userData } = user.toObject();

        return res.status(201).json({
            message: "User Registered Successfully",
            user: userData,
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


const userLogin =async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        // Compare Passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials",
            data: {
                name: user.name,
                role: user.role,
                email: user.email,
            }
         });

        // Generate Token
        const token = jwt.sign({ user_id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

         res.json({ message: "Login Successful", 
            data: {
            name: user.name,
            role: user.role,
            email: user.email,
          },token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// module.exports = ;
module.exports = {userLogin,userRegistration};