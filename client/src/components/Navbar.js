import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { Button } from 'react-bootstrap';
import Logo from './images/mendinglogo.png';

import '../styles/Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch()
  const {isAuth} = useSelector((state) => state.auth)
  const [userId, setUserId] = useState(true);

  const protectedInfo = async () => {
    const {data} = await fetchProtectedInfo();
    setUserId(data.info);
  }

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth')
    } catch (err) {
      console.error(err.response)
    }
  }

  useEffect(() => {
    if(isAuth)
      protectedInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <nav>
      {isAuth && (
        <div className="main-nav"> 
          <div>
            <NavLink className="nav-logo" to='/dashboard'>
              <img src={Logo} alt = "" class ="nav-logo"/>
            </NavLink>
          </div>

          <div>
            <NavLink className="nav-item " to='/contact'>
              <span>Contact Professional</span>
            </NavLink>

            <NavLink className="nav-item" to="/activities">
              <span>Activities</span>
            </NavLink>

            <NavLink className="nav-item" to={`/profile/${userId}`}>
              Profile
            </NavLink>

            <Button variant="outline-dark" onClick={() => logout()}>Log Out</Button>
          </div>
        </div>
      )}
    </nav>

  );
}

export default Navbar;