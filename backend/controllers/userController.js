const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")

// @desc add a user
// @route POST /api/user
// @access Public
const addUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    if(!username || !email || !password) {
        res.status(400)
        throw new Error("Please fill all the fields")
    }

    // check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error("User exists login")
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create the user
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201)
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }

})

// @desc log a user in
// @route POST /api/user/login
// @access Public
const loginAuser = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(201)
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }

})

// @desc get current user
// @route GET /api/user/current
// @access Private
const getCurrentUser = asyncHandler(async (req, res) => {    
    res.status(200)
    res.json(req.user)
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = {
    addUser,
    loginAuser,
    getCurrentUser
}
