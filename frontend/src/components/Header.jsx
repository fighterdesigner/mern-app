import {Link, useNavigate} from "react-router-dom"
import {FaSignInAlt, FaSignOutAlt, FaEdit, FaClipboardList} from "react-icons/fa"
import {useSelector, useDispatch} from "react-redux"
import {logout, reset} from "../features/auth/authSlice"

function Header() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)

  const logOut = () => {
      dispatch(logout())
      dispatch(reset())
      navigate("/login")
  }

  return (
    <header>
        <div>
            <FaClipboardList />
        </div>
        <ul>
            {user ? (
                <>
                    <li className="log-out-button">
                        <p onClick={logOut}><FaSignOutAlt /> Log out</p>
                    </li>
                </>  
            ) : (
                <>
                <li>
                    <Link to="/login"><FaSignInAlt /> Log in</Link>
                </li>
                <li>
                    <Link to="/registre"><FaEdit /> Registre</Link>
                </li>
                </>
            )}
        </ul>        
    </header>
  )
}

export default Header
