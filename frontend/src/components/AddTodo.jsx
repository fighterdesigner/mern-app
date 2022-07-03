import {useState} from "react"
import {useDispatch} from "react-redux"
import {createTodo} from "../features/todoList/todoListSlice"

function AddTodo() {
    const [todoData, setTodoData] = useState({
        title: "",
        body: "",
        done: false
    })

    const dispatch = useDispatch()
    const {title, body} = todoData

    const onChange = (event) => {
        setTodoData((prevState) => (
            {   
                ...prevState,
                [event.target.name]: event.target.value
            }
        ))
    }

    const onSubmit = (event) => {
        event.preventDefault()
        
        dispatch(createTodo(todoData))

        setTodoData({
            title: "",
            body: "",
            done: false
        })
    }
  return (
    <div className="add-todo">
        <h4>Add your todo:</h4>
        <form className="add-todo-form" onSubmit={onSubmit}>
            <input type="text" name="title" value={title} onChange={onChange} placeholder="Enter a title..."></input>
            <input type="text" name="body" value={body} onChange={onChange} placeholder="Enter the body..."></input>
            <input type="submit" value="Add"></input>
        </form>
    </div>
  )
}

export default AddTodo