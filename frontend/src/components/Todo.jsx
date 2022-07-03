import {FaRegWindowClose, FaToggleOn, FaToggleOff} from "react-icons/fa"
import {useDispatch} from "react-redux"
import {deleteTodo, updateTodo} from "../features/todoList/todoListSlice"

function Todo({todo}) {
  const dispatch = useDispatch()

  const updateATodo = () => {
    const myTodo = {
      ...todo,
      done: !todo.done
    }
    dispatch(updateTodo(myTodo))
  }

  return (
    <div className={todo.done ? "todo-container container-done-background" : "todo-container"}>
      <div>
        <button onClick={() => updateATodo()}>{todo.done ? <FaToggleOn /> : <FaToggleOff />}</button>
        <button onClick={() => dispatch(deleteTodo(todo._id))}><FaRegWindowClose /></button>
      </div>
      <h3>{todo.title}</h3>
      <p>{todo.body}</p>
    </div>
  )
}

export default Todo