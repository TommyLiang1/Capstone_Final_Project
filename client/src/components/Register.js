import React, {useState} from "react";
import { onRegistration } from "../api/auth";
import Layout from "./Layout";
import '../styles/Register.css';

const Register = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await onRegistration(values)
      console.log(res);
    } catch (err) {
      console.error(err.res);
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true)
  }

  return (
    <Layout>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Register</h1>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input onChange={(e) => onChange(e)} id="username" name="username" type='text' className="form-control" value={values.username} placeholder="username" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
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

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </Layout>
  );
};

export default Register;