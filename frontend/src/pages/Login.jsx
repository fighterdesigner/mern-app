import {useState, useEffect} from "react"

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData
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
    }
    return (
        <section className="registre-page">
        <div className="register-form-container">
        <h1>Log in</h1>
        <form onSubmit={onSubmit} className="register-form">
            <input type="text" value={email} name="email" placeholder="Enter an email" onChange={onChange}></input>
            <input type="text" value={password} name="password" placeholder="Enter a password" onChange={onChange}></input>
            <input type="submit" value="Log in"></input>
        </form>
        </div>
    </section>
    )
}

export default Login
