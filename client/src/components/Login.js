import React, {useState} from "react";
import Layout from "./Layout";
import { onLogin } from "../api/auth";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { authenticateUser } from "../redux/slices/authSlice";
import { FcGoogle } from 'react-icons/fc';

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

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  
  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (res) => {
  //     const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //       headers: {
  //         "Authorization": `Bearer ${res.access_token}`,
  //         "Access-Control-Allow-Origin": window.location.origin
  //       }
  //     })
  //     console.log(data)
  //   },
  //   onError: err => console.log(err),
  // });

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

        <div id="g_id_onload"
          data-client_id="689025333147-lsi1p9fufm2m0hu6cn8ee5jpd07empe7.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="popup"
          data-login_uri="http://localhost:3000/login"
          data-itp_support="true"
          data-auto_prompt="true">
        </div>

        <div className="g_id_signin"
          data-type="standard"
          data-shape="rectangular"
          data-theme="filled_black"
          data-text="continue_with"
          data-size="large"
          data-logo_alignment="left"
          data-width="400px">
        </div>

        {/* <div className="google-btn-container">
          <button className="google-btn form-btn">
            <FcGoogle size={25}/>
            <span>Continue with Google</span>
          </button>
        </div> */}
        <GoogleLogin
          className="form-btn google-btn"
          onSuccess={credentialResponse => {
            console.log(credentialResponse)
            let decoded = jwt_decode(credentialResponse.credential)
            console.log(decoded)
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
        />
      </form>
    </Layout>
  );
};

export default Login;