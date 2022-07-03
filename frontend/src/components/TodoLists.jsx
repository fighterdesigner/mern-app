import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"
import {getTodos, reset} from "../features/todoList/todoListSlice"
import Spinner from "./Spinner"
import Todo from "./Todo"

function TodoLists() {
  const dispatch = useDispatch()

  const {todoLists, isError, isLoading,message} = useSelector(state => state.todoList)
  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if(user) {
      dispatch(getTodos())
    }
     
    return () => {
      dispatch(reset())
    }
  }, [dispatch, isError, message, user])

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div>{todoLists.map(todo => (<Todo todo={todo} key={todo._id}/>))}</div>
  )
}

export default TodoLists
