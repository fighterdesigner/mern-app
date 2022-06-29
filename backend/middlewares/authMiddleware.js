const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get user id from token and set it the req
            req.user = await User.findById(decoded.id).select("-password")

            next()
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized")
        }
    }

    if(!token) {
        res.status(401)
        throw new Error("Not authorized")
    }
})

module.exports = {authMiddleware}
