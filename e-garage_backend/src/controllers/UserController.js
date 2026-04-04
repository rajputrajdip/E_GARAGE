// controllers/UserController.js
const User = require("../models/Usermodels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "secret123";
const crypto = require("crypto");
const mailSend = require("../utils/MailUtil");

// ----------------------------
// Register new user
// ----------------------------
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        id: newUser._id,
        firstName,
        lastName,
        email,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ----------------------------
// Login user
// ----------------------------
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      secret,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// ----------------------------
// Get all users (Admin only)
// ----------------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};

// ----------------------------
// Get my profile
// ----------------------------

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { firstName, lastName, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // generate random token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // hash token before saving
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

await user.save({ validateBeforeSave: false });

const checkUser = await User.findOne({ email: user.email });
console.log("DB TOKEN AFTER SAVE:", checkUser.resetPasswordToken);


    const url = `http://localhost:5173/resetpassword/${resetToken}`;
console.log("RAW TOKEN:", resetToken);
console.log("HASHED TOKEN SAVED:", hashedToken);
    const mailtext = `
      <h3>Password Reset</h3>
      <p>Click below link:</p>
      <a href="${url}">Reset Password</a>
    `;

await mailSend(user.email, "Reset Password", mailtext);
console.log("mailSend function:", mailSend);
    res.status(200).json({
      message: "Reset link sent to email"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const resetpassword = async (req, res) => {
  try {
    const token = req.params.token;

    // 🔥 HASH incoming token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    console.log("Incoming token:", token);
    console.log("Hashed token:", hashedToken);

const user = await User.findOne({
  resetPasswordToken: hashedToken
});
console.log("USER FOUND:", user);

    if (!user) {
      return res.status(400).json({
        message: "Token invalid or expired",
      });
    }

    // 🔐 hash new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { registerUser, loginUser, getAllUsers, getMyProfile, updateProfile,forgotpassword, resetpassword };