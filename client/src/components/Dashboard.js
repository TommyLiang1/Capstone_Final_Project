import React, {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import Layout from "./Layout";
import { unauthenticateUser } from "../redux/slices/authSlice";

import '../styles/Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch()
  const [quoteoftheday, setquoteoftheday] = useState(0)
  const [loading, setLoading] = useState(true)
  const [protectedData, setProtectedData] = useState(null)
 

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem('isAuth')
    } catch (err) {
      console.error(err.response)
    }
  }

  const protectedInfo = async () => {
    try {
      const {data} = await fetchProtectedInfo()
      setProtectedData(data.info)
      setLoading(false)
    } catch (err) {
      logout()
    }
  }

  useEffect(() => {
    const URL ="https://corsproxy.io/?https://zenquotes.io/api/today";
    const fetchData = async () =>{
      const result = await fetch(URL);
      result.json().then(json => {
     // console.log(json[0].a);
      setquoteoftheday(json[0].q + ' - ' + json[0].a);
      })
    }
      fetchData();
    }, []);

  useEffect(() => {
    protectedInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <Layout>
      <div class="banner"><h1>{quoteoftheday}</h1></div>
      <h2>Welcome Back {protectedData}!</h2>
      <button onClick={() => logout()} className='btn btn-primary'>
        Log Out
      </button>
    </Layout>
  );
};

export default Dashboard;