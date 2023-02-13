import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchProtectedInfo } from "../api/auth";

import '../styles/Navbar.css';

const Navbar = () => {
  const {isAuth} = useSelector((state) => state.auth)
  const [userId, setUserId] = useState(true);

  const protectedInfo = async () => {
    const {data} = await fetchProtectedInfo();
    setUserId(data.info);
  }

  useEffect(() => {
    protectedInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav>
      {isAuth ? (
        <div className="main-nav">
          <div>
            <NavLink className="nav-item" to='/dashboard'>
              <span>Dashboard</span>
            </NavLink>
          </div>

          <div className="nav-item-right">
            <NavLink className="nav-item " to='/'>
              <span>Contact Professional</span>
            </NavLink>

            <NavLink className="nav-item" to={`/profile/${userId}`}>
              <span>Profile</span>
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="main-nav">
          <div>
            <NavLink className="nav-item" to='/'>
              <span>Home</span>
            </NavLink>
          </div>

          <div className="nav-item-right">
            <NavLink className="nav-item" to='/login'>
              <span>Login</span>
            </NavLink>

            <NavLink className="nav-item" to='/register'>
              <span>Register</span>
            </NavLink>
          </div>
        </div>
      )}
    </nav>

  );
}

export default Navbar;