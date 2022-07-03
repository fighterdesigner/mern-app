import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todoListReducer from '../features/todoList/todoListSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todoList: todoListReducer
  },
});
