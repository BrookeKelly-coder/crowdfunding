import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./styles.css"

// function Nav() {
//     return (
//         <nav>
//         <Link to="/">Home</Link>
//         </nav>
//     );
// }

// export default Nav;

const Nav = () => {
    console.log('rendering nav bar')
    const [loggedIn,setLoggedIn] = useState(localStorage.getItem('token'))

    const logout = () => {
        setLoggedIn(false)
        localStorage.clear()
    }

    return (
         <nav id="container">
            <Link to="/">Home</Link>
            <Link to="/Register">Register</Link>

            {
            loggedIn
            ? <Link to="/" onClick={logout}>Logout</Link>
            : <Link to="/login">Login</Link>
            }
        </nav>  
    )
}
 
export default Nav