import React, {useEffect, useState, useRef} from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout, getUserById } from "../api/auth";
import { getPosts, createPost } from "../api/post";
// import { getProfile } from "../api/profile";
import { unauthenticateUser } from "../redux/slices/authSlice";
import Layout from "./Layout";
import Post from "./Posts/Post";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const message = useRef("")
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    profId: '',
  })
  
  // Log Out
  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.clear()
    } catch (err) {
      console.error(err.response)
    }
  }

  // Creating a new post
  const submitPost = async(e) => {
    e.preventDefault()
    if(message.current.value === "") {
      setError("Please enter a message!")
      setSuccess("")
      return;
    }
    let postData = {
      id: user.id,
      username: user.name,
      message: message.current.value,
    }
    await createPost(postData)
      .then(() => {
        message.current.value = "";
        setSuccess("Post created successfully");
        setError("");
        reloadPosts();
      })
  }

  const reloadPosts = () => {
    getPosts()
      .then(res => {
        setPosts(res.data.posts)
      })
  }

  // Use effect function to get the user
  const getUserInfo = async () => {
    let tmpId;
    await fetchProtectedInfo()
      .then(res => {
        tmpId = res.data.info
      })
      .catch(err => {
        console.log(err)
        logout()
      })
      
    await getUserById(tmpId)
      .then(res => {
        setUser({
          id: res.data.user[0].user_id,
          name: res.data.user[0].user_name,
          email: res.data.user[0].user_email,
          profId: res.data.user[0].profile_id,
        })  
      })
      .catch((err) => {
        console.log(err)
        logout()
      })
    setLoading(false)

    await getPosts()
      .then(res => {
        setPosts(res.data.posts)
      })
  }

  useEffect(() => {
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <Layout>
      <h1>Dashboard</h1>
      <h1>Welcome Back {user.name}!</h1>
      <div className="text-container">
        <textarea className="text" ref={message} placeholder="Whats on your mind?"></textarea>
        <div style={{color:'red', margin: '5px 0' }}>{error}</div>
        <div style={{color:'green', margin: '5px 0' }}>{success}</div>
        <button onClick={(e) => submitPost(e)} className="text-btn">Post</button>
      </div>
      {
        posts.map(post => {
          return <Post key={post.post_id} postData={post} userName={user.name} reloadPosts={reloadPosts}/>
        })
      }
    </Layout>
  );
};

export default Dashboard;