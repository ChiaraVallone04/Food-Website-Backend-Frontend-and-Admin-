import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login 
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = createToken(user._id);
        return res.json({ success: true, token });
    } catch (error) {
        console.error("Login error:", error); 
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

// Register
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Checking if user already exists
        const exists = await userModel.findOne({ email });

        if (exists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a stronger password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();
        console.log("New user saved:", user); // Debugging line

        const token = createToken(user._id);
        return res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export {loginUser, registerUser};