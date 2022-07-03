import axios from "axios"

const API_URL = "/api/todolist/"

// add a todo
const addTodo = async (todo, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, todo, config)
    return response.data
}

// get user todos
const getTodos = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

// delete a tdodo
const deleteTodo = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + id, config)
    return response.data
}

// update a todo
const updateTodo = async (todo, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(API_URL + todo._id, todo, config)
    return response.data
}

const todoListService = {
    addTodo,
    getTodos,
    deleteTodo,
    updateTodo
}
export default todoListService
