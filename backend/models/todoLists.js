const mongoose = require("mongoose")

const todoLists = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, "Please add a title"]
    },
    body: {
        type: String,
        required: [true, "Please add a body"]
    },
    done: {
        type: Boolean,
        required: [true, "Please add a value"]
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("TodoList", todoLists)
