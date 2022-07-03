import {useEffect} from "react"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import AddTodo from "../components/AddTodo"
import TodoLists from "../components/TodoLists"

function Dashboard() {
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <section className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome {user && user.username} !</h2>
      </div>
      <div className="dashboard-todos">
          <AddTodo />
          <TodoLists />
      </div>
    </section>
  )
}

export default Dashboard
