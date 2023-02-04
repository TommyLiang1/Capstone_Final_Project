import { NavLink } from "react-router-dom";
import '../styles/Navbar.css';
import { useSelector } from "react-redux";

const Navbar = () => {
  const {isAuth} = useSelector((state) => state.auth)
  return (
    <nav>
      <div className="main-nav">
        <div>
          <NavLink className="nav-item" to='/'>
            <span>Home</span>
          </NavLink>
        </div>

        {isAuth ? (
          <div className="nav-item-right">
            <NavLink className="nav-item" to='/dashboard'>
              <span>Dashboard</span>
            </NavLink>
          </div>
        ) : (
          <div className="nav-item-right">
            <NavLink className="nav-item" to='/login'>
              <span>Login</span>
            </NavLink>

            <NavLink className="nav-item" to='/register'>
              <span>Register</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>

  );
}

export default Navbar;