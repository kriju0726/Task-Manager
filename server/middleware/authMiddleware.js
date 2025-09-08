const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async(req, res) => {
    const token = req.cookies.taskifyUserToken;
    console.log(token);

    try {
        if(!token){
            return res.status(401).json({ error: 'new-user' });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id);

        if(!user){
            return res.status(404).json({ message:"User not found" });
        }

        req.user = user;    //req.body.user
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;


