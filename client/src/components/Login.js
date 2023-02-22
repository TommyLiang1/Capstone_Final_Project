import React, {useState} from "react";
import Layout from "./Layout";
import { onLogin, onGoogleLogin } from "../api/auth";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { authenticateUser } from "../redux/slices/authSlice";

import '../styles/Form.css';
import '../styles/Login.css';

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await onLogin(values)
      dispatch(authenticateUser())
      localStorage.setItem('isAuth', 'true')
    } catch (err) {
      console.error(err.response.data.errors[0].msg)
      setError(err.response.data.errors[0].msg)
    }
  }

  const onSuccess = async (credentialResponse) => {
    //console.log(credentialResponse)
    let decoded = jwt_decode(credentialResponse.credential)
    //console.log(decoded)
    try {
      await onGoogleLogin(decoded)
    dispatch(authenticateUser())
    localStorage.setItem('isAuth', 'true')
    } catch (err) {
      console.error(err)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='form-container mt-3'>
        <h1>Log In</h1>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input onChange={(e) => onChange(e)} id="email" name="email" type='email' className="form-control" value={values.email} placeholder="email" required />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div>
            <input onChange={(e) => onChange(e)} id="password" name="password" type={passwordShown? 'text' : 'password'} className="form-control" value={values.password} placeholder="password" required />
            <i onClick={() => togglePasswordVisibility()} className={passwordShown? "far fa-eye-slash" : "far fa-eye"} id="togglePassword" style={{marginLeft: -30}}></i>
          </div>
        </div>

        <div style={{color:'red', margin: '10px 0' }}>{error}</div>

        <button type="submit" className="form-btn btn btn-primary">
          Log In
        </button>

        <div className="or">or</div>

        {/* <div className="google-btn-container">
          <button className="google-btn form-btn">
            <FcGoogle size={25}/>
            <span>Continue with Google</span>
          </button>
        </div> */}
        <GoogleLogin
          className="form-btn google-btn"
          onSuccess={(credentialResponse) => onSuccess(credentialResponse)}
          onError={(err) => {
            console.log('Login Failed', err);
          }}
          useOneTap
        />
      </form>
    </Layout>
  );
};

export default Login;