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
            res.status(400).send('please fill all the details')
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).send("user does not exist")
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            res.status(400).send("invalid credentials");
        }

        const token = jwt.sign({ userId: user.__id }, "secret", {
            expiresIn: "240h",
        })
        res.status(200).json({
            token,
            userId: user.__id,
            name: user.name,
            email: user.email,
            password: user.password,
        });
    } catch (err) {
        next(err);
    }





}

module.exports = { userRegister,userLogin}