import {useState, useEffect} from "react"

function Registre() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: ""
  })

  const {username, email, password, password2} = formData
  const onChange = (event) => {
    setFormData((prevState) => (
      {
        ...prevState,
        [event.target.name]: event.target.value
      }
    ))
  }
  const onSubmit = () => {}
  return (
    <section className="registre-page">
      <div className="register-form-container">
        <h1>Create your account</h1>
        <form onSubmit={onSubmit} className="register-form">
          <input type="text" value={username} name="username" placeholder="Enter a user name" onChange={onChange}></input>
          <input type="text" value={email} name="email" placeholder="Enter an email" onChange={onChange}></input>
          <input type="text" value={password} name="password" placeholder="Enter a password" onChange={onChange}></input>
          <input type="text" value={password2} name="password2" placeholder="Confirme password" onChange={onChange}></input>
          <input type="submit" value="Register"></input>
        </form>
      </div>
    </section>
  )
}

export default Registre
