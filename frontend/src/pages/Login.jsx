import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"
import {login, reset} from "../features/auth/authSlice"
import Spinner from "../components/Spinner"
import {FaEye, FaEyeSlash} from "react-icons/fa"

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)

    const {email, password} = formData

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
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

    return (
        <section className="registre-page">
        <div className="register-form-container">
        <h1>Log in</h1>
        <form onSubmit={onSubmit} className="register-form">
            <input type="text" value={email} name="email" placeholder="Enter an email" onChange={onChange}></input>
            <div className="password-field">
                 <input type={showPassword ? "text" : "password"} value={password} name="password" placeholder="Enter a password" onChange={onChange}></input>
                 <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
            </div>
            <input type="submit" value="Log in"></input>
        </form>
        </div>
    </section>
    )
}

export default Login
