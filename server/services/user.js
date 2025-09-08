const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fileds Required" });
        }

        const checkUsers = await User.findOne({ $or: [{ email }, { username }] });
        if (checkUsers) {
            return res.status(400).json({ error: "Username or Email already Registered !!!" })
        } else {
            const hashPass = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashPass });     //make new User in mongoDB
            await newUser.save();
            return res.status(200).json({ success: "Registered!!!" });
        }
    } catch (error) {
        return res.status(400).json({ error: "Internal Server Error" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "All fileds Required" });
        }

        const checkUser = await User.findOne({ email });
        if (checkUser) {
            bcrypt.compare(password, checkUser.password, (err, data) => {
                if (data) {
                    const token = jwt.sign(
                        { id: checkUser._id, email: checkUser.email },
                        process.env.JWT_SECRET, { expiresIn: "30d" }
                    );

                    res.cookie("taskifyUserToken", token, {
                        httpOnly: true,
                        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                        secure: process.env.NODE_ENV === "production",
                        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
                    });

                    return res.status(200).json({ success: "Login Success! Token Formed" });
                } else {
                    return res.status(400).json({ error: "Invalid Credentials" })
                }
            });
        } else {
            return res.status(400).json({ error: "User not Exist" })
        }
    } catch (error) {
        return res.status(400).json({ error: "Internal Server Error" });
    }
}

const logout = async(req, res) => {
    try {
       res.clearCookie('taskifyUserToken', {
        httponly: true,
       });
       res.json({ message: "Logged Out" });
    } catch (error) {
        return res.status(404).json({ error: 'Internal server Error!' });
    }
}

module.exports = { register, login, logout };
