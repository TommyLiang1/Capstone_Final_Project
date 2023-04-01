import React, {Fragment} from 'react';
import './App.css';

import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';

//Components
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Activities from './components/Activities';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
  const {isAuth} = useSelector((state) => state.auth)
  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const {isAuth} = useSelector((state) => state.auth)
  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/activities" element={<Activities />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
