import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import todoListService from "./todoListService" 

const initialState = {
    todoLists: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create a todo
export const createTodo = createAsyncThunk("todo/create", async (todo, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await todoListService.addTodo(todo, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get todos of a user
export const getTodos = createAsyncThunk("todo/get", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await todoListService.getTodos(token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// delete a todo
export const deleteTodo = createAsyncThunk("todo/delete", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await todoListService.deleteTodo(id, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update a todo
export const updateTodo = createAsyncThunk("todo/update", async (todo, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await todoListService.updateTodo(todo, token)
    } catch(error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const todoListSlice = createSlice({
    name:"todoList",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todoLists.push(action.payload)
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true       
                state.message = action.payload
            })
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todoLists = action.payload
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true       
                state.message = action.payload
            })
            .addCase(deleteTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todoLists = state.todoLists.filter(todo => todo._id !== action.payload.id)
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true       
                state.message = action.payload
            })
            .addCase(updateTodo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.todoLists = state.todoLists.map(todo => todo._id === action.payload._id ? action.payload : todo)
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true       
                state.message = action.payload
            })
    }
})

export const {reset} = todoListSlice.actions

export default todoListSlice.reducer
