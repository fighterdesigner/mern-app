const express = require("express")
const router = express.Router()
const {getTodoLists, postTodoLists, updateTodoLists, deleteTodoLists} = require("../controllers/todoListController")

const { authMiddleware } = require("../middlewares/authMiddleware")


router.route("/").get(authMiddleware,getTodoLists).post(authMiddleware,postTodoLists)
router.route("/:id").put(authMiddleware,updateTodoLists).delete(authMiddleware,deleteTodoLists)

module.exports = router
