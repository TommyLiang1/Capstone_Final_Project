import React, {useState} from "react";
import Layout from "./Layout";
import { onLogin } from "../api/auth";
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useDispatch } from 'react-redux';
import { authenticateUser } from "../redux/slices/authSlice";
import '../styles/Form.css';

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
        <div className="g-signin2" data-onsuccess="onSignIn"></div>

        <button className="google-btn form-btn" onClick={googleLogin}>
          Continue With Google
          {/* <i className="fa-brands fa-google"></i> */}
        </button>
        {/* <GoogleLogin
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
        /> */}
      </form>
    </Layout>
  );
};

export default Login;