const express = require("express")
const router = express.Router()
const { addUser, loginAuser, getCurrentUser } = require("../controllers/userController")
const { authMiddleware } = require("../middlewares/authMiddleware")

router.post("/", addUser)
router.post("/login", loginAuser)
router.get("/current", authMiddleware, getCurrentUser)

module.exports = router
