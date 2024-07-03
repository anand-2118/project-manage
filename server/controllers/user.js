const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const userRegister = async (req, res, next) => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (!name || !email || !password || !confirmPassword) {
            res.status(400).send("please fill all the details")
        }

        if (password !== confirmPassword) {
            res.status(400).send("password do not match")
        }
        const isUserExists = await (User.findOne({ email }))
        if (isUserExists) {
            res.status(400).send("user already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).send("User registered successfully");


    }
    catch (error) {
        console.error(error);
        // Pass the error to the error-handling middleware
        next(error);
    }
}

const userLogin = async (req, res,next) => {
    try {
        
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(200).send('please fill all the details')
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(200).send("user does not exist")
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(200).send("invalid credentials");
        }

        const token = jwt.sign({ userId: user.__id }, "secret", {
            expiresIn: "240h",
        })
        res.status(200).json({
            token,
            userId: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        res.status(500).send("server error");
    }

}

const logout = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        jwt.verify(token, JWT_SECRET);
        // If using a token blacklist, save this token to the blacklist here
        // Or delete the token on the client side to prevent further use
        res.status(200).send("Logout successful");
    } catch (err) {
        res.status(400).send("Invalid token");
    }
};
module.exports = { userRegister,userLogin}