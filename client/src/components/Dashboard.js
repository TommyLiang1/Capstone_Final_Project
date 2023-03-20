import React, {useEffect, useState, useRef} from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout, getUserById } from "../api/auth";
import { getPosts, createPost } from "../api/post";
import { getPostsLikedByUser } from "../api/like";
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
  const [postIds, setPostIds] = useState([]);
  const [likeIds, setLikeIds] = useState([]);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    profId: '',
  })
  let like_id = -1;
  
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

    // Get all Posts
    await getPosts()
      .then(res => {
        setPosts(res.data.posts)
      })
    
    // Get postIds like by User
    await getPostsLikedByUser(tmpId)
      .then(res => {
        if(res.data.postIds.length === 0) return;
        let tmpPostIds = [];
        let tmpLikeIds = [];
        res.data.postIds.forEach(postId => {
          // console.log(postId)
          tmpPostIds = [...tmpPostIds, postId.post_id]
          tmpLikeIds = [...tmpLikeIds, postId.like_id]
        })
        setPostIds(tmpPostIds)
        setLikeIds(tmpLikeIds)
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
      <div>Welcome back {user.name}</div>
      <div className="text-container">
        <textarea className="text" ref={message} placeholder="Whats on your mind?"></textarea>
        <div style={{color:'red', margin: '5px 0' }}>{error}</div>
        <div style={{color:'green', margin: '5px 0' }}>{success}</div>
        <button onClick={(e) => submitPost(e)} className="text-btn">Post</button>
      </div>
      {
        posts.map(post => {
          // retreive like_id is post is liked by current user
          like_id = postIds.includes(post.post_id) ? likeIds[postIds.indexOf(post.post_id)] : -1
          // console.log(like_id, post.post_id, postIds.includes(post.post_id))
          return <Post key={post.post_id} userId={user.id} userName={user.name} postData={post} likeId={like_id} reloadPosts={reloadPosts} reloadLikes={getPostsLikedByUser}/>
        })
      }
      {/* {
        postIds.map(postId => {
          return <div>{postId}</div>
        })
      }
      {
        likeIds.map(postId => {
          return <div>{postId}</div>
        })
      } */}
    </Layout>
  );
};

export default Dashboard;