import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";

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
            <NavLink className="nav-item" to='/dashboard'>
              <span>Mending</span>
            </NavLink>
          </div>

          <div className="nav-item-right">
            <NavLink className="nav-item" to="/activities">
              <span>Activites</span>
            </NavLink>
            
            <NavLink className="nav-item " to='/contact'>
              <span>Contact Professional</span>
            </NavLink>

            <NavLink className="nav-item" to={`/profile/${userId}`}>
              <span>Profile</span>
            </NavLink>

            <button onClick={() => logout()} className='logout-btn'>
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>

  );
}

export default Navbar;