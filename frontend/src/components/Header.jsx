import {Link} from "react-router-dom"
import {FaUserAlt, FaSignInAlt, FaSignOutAlt, FaEdit, FaClipboardList} from "react-icons/fa"

function Header() {
  return (
    <header>
        <div>
            <FaClipboardList />
        </div>
        <ul>
            <li>
                <Link to="/"><FaUserAlt /> My dashboard</Link>
            </li>
            <li>
                <Link to="/login"><FaSignInAlt /> Log in</Link>
            </li>
            <li>
                <Link to="/registre"><FaEdit /> Registre</Link>
            </li>
        </ul>        
    </header>
  )
}

export default Header
