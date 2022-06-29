const TodoList = require("../models/todoLists")
const User = require("../models/userModel")
const asyncHandler = require("express-async-handler");
// @desc Get todo lists
// @route GET /api/todolists
// @access Private
const getTodoLists = asyncHandler(async (req, res) => {
    const todolists = await TodoList.find({user: req.user.id})
    res.status(200)
    res.json(todolists)
})

// @desc Post todo list
// @route POST /api/todolists
// @access Private
const postTodoLists = asyncHandler(async (req, res) => {

    if(!req.body.title || !req.body.body || !req.body.done) {
        res.status(400)
        throw new Error("Please enter all fields");
    }

    const todolist = await TodoList.create({
        user: req.user.id,
        title: req.body.title,
        body: req.body.body,
        done: req.body.done
    })

    res.status(201)
    res.json(todolist)

})

// @desc Update todo list
// @route PUT /api/todolists/:id
// @access Private
const updateTodoLists = asyncHandler(async (req, res) => {
    const todolist = await TodoList.findById(req.params.id)

    if(!todolist) {
        res.status(400)
        throw new Error("Todo list not found")
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(404)
        throw new Error("User not foud")
    }

    if(todolist.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedTodoList = await TodoList.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200)
    res.json(updatedTodoList)
})

// @desc Delete todo list
// @route DELETE /api/todolists/:id
// @access Private
const deleteTodoLists = asyncHandler(async (req, res) => {
    
    const todolist = await TodoList.findById(req.params.id)
    if(!todolist) {
        res.status(400)
        throw new Error("Todo list not found")
    }

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(404)
        throw new Error("User not foud")
    }

    if(todolist.user.toString() !== user.id) {
        res.status(401)
        throw new Error("User not authorized")
    }

    const removedTodoList = todolist.remove()

    res.status(200)
    res.json({id: req.params.id})
})

module.exports = {
    getTodoLists,
    postTodoLists,
    updateTodoLists,
    deleteTodoLists
}
