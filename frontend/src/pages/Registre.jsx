import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {register, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"

function Registre() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  })

  const {username, email, password, password2} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError) {
      toast.error(message)
    }
    if(isSuccess || user) {
      navigate("/")
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])
  
  const onChange = (event) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [event.target.name]: event.target.value
      }
    ))
  }
  const onSubmit = (event) => {
    event.preventDefault()

    if(password !== password2) {
      toast.error("Passwords do not match!")
    } else {

      const userData = {
        username,
        email,
        password
      }
      dispatch(register(userData))

    }

  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <section className="registre-page">
      <div className="register-form-container">
        <h1>Create your account</h1>
        <form onSubmit={onSubmit} className="register-form">
          <input type="text" value={username} name="username" placeholder="Enter a user name" onChange={onChange}></input>
          <input type="text" value={email} name="email" placeholder="Enter an email" onChange={onChange}></input>
          <input type="password" value={password} name="password" placeholder="Enter a password" onChange={onChange}></input>
          <input type="password" value={password2} name="password2" placeholder="Confirme password" onChange={onChange}></input>
          <input type="submit" value="Register"></input>
        </form>
      </div>
    </section>
  )
}

export default Registre
