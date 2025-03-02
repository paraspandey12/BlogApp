const user = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const {fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      console.error("Validation failed: Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    if (fullname.length < 3) {
      console.error("validation failed: name should be greater than 3 letters");
      return res
        .status(403)
        .json({ message: "name should be greater than 3 letters" });
    }

    if (!emailRegex.test(email)) {
      return res.status(403).json({ error: "email is not in correct format" });
    }

    if (!passwordRegex.test(password)) {
      return res
        .status(403)
        .json({
          error:
            "password should contain atlest one capitol, one special character",
        });
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      console.error("user already exists");
      return res.status(400).json({ message: "user already exists" });
    }

    const username = email.split('@')[0];
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({ username,fullname, email, password: hashedPassword });

    await newUser.save();
    const userResponse = newUser.toObject();
    delete userResponse.password;
    res.status(200).json(userResponse);
    
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      console.error("Validation failed: Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await user.findOne({ username });
    if (!existingUser) {
      console.error("user does not exists");
      return res.status(400).json({ message: "user does not exists" });
    }

    const isPasswordCorrect = await  bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userId: existingUser.id,
        email: existingUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token,{
      httpOnly:true,
      secure:"production",
      maxAge:3600000,
    });


    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        fullname:existingUser.fullname,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const userId=req.user.id  
    const users = await user.findById(userId);
    console.log(users)
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user.userId; 
    const { fullname, email } = req.body;

    if (!fullname || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { fullname, email },
      { new: true, runValidators: true }
    ).select("-password"); 
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createUser, getUsers, login,updateUser};
