import React, { useEffect, useState } from "react";
import { editProfile } from "../api/profile";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/profile";
import { fetchProtectedInfo } from "../api/auth";
import axios from 'axios';

import Post from "./Posts/Post";
import { getPosts, createPost } from "../api/post";
import { getPostsLikedByUser } from "../api/like";
import {useRef} from "react";
import { useDispatch } from "react-redux";
import { getUserById } from "../api/auth";

import '../styles/Profile.css';

const Profile = () => {
  const dispatch = useDispatch()
  const [quoteoftheday, setquoteoftheday] = useState(0)
  const [loading, setLoading] = useState(true)
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

  // Refresh posts
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
      })
      
    await getUserById(tmpId)
      .then(res => {
        setUser({
          id: res.data.user[0].user_id,
          name: res.data.user[0].user_name,
          email: res.data.user[0].user_email
        })  
      })
      .catch((err) => {
        console.log(err)
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
          tmpPostIds = [...tmpPostIds, postId.post_id]
          tmpLikeIds = [...tmpLikeIds, postId.like_id]
        })
        setPostIds(tmpPostIds)
        setLikeIds(tmpLikeIds)
      })
  }

  const {id} = useParams();
  const [userInfo, setUserInfo] = useState({
    profile_id: '',
    profile_name: '',
    profile_email: '',
    img: '',
    city: '',
    bio: '',
    education: '',
    hobbies: ''
  })

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState('');
  const [protectedData, setProtectedData] = useState(null)
  
  const onChange = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  function isFileImage(file) {
    return file && file['type'].split('/')[0] === 'image';
  }
  
  const imageUpload = (e) => {
    if(e.target.files[0].name === undefined || !isFileImage(e.target.files[0])){
      return;
    }
    console.log(e.target.files[0].name)
    userInfo.img = "profile-picture-" + userInfo.profile_id + "_" + e.target.files[0].name
    console.log(userInfo.img)
    const formData = new FormData();
    formData.append('my-image-file', e.target.files[0], userInfo.img);
    setImage(formData);
  }

  const handleSubmit = () => {
    axios.post('http://localhost:4000/image-upload', image)
    .then(res => {
      console.log('Axios response: ', res)
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    handleSubmit();

    try {
      const res = await editProfile(id, userInfo)
      setError('')
      setSuccess(res.data.message)
      setEditMode(false);

    } catch (err) {
      console.error(err.response.data.errors[0].msg)
      setError(err.response.data.errors[0].msg)
      setSuccess('')
    }

  }

  const cancelEdit = () => {
    setEditMode(false);
    setSuccess()
  }

  const retrieveInfo = async () => {
    await getProfile(id)
      .then(res => {
        setUserInfo({
          profile_id: res.data.profile[0].user_id,
          profile_name: res.data.profile[0].user_name,
          profile_email: res.data.profile[0].user_email,
          img: res.data.profile[0].img,
          city: res.data.profile[0].city,
          bio: res.data.profile[0].bio,
          education: res.data.profile[0].education,
          hobbies: res.data.profile[0].hobbies
        })  
      })
  }

  function importAll(r) {
    let images = [];
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./images', false, ));

  const protectedInfo = async () => {
    try {
      const {data} = await fetchProtectedInfo()
      console.log(data)
      setProtectedData(data.info)
    } catch (err) {
    }
  }

  useEffect(() => {
    retrieveInfo()
    protectedInfo()
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      {
        editMode ? (
          <div>
          <div class ="name"> Edit Profile </div>
          <div class ="edit">
            Username: <input onChange={(e) => onChange(e)} id="profile_name" name="profile_name" type='text' placeholder="Username" required />
          </div>
          <div class ="edit">
            Bio: <input onChange={(e) => onChange(e)} id="bio" name="bio" type='text' placeholder="Bio" required />
          </div>
          <div class ="edit">
            City: <input onChange={(e) => onChange(e)} id="city" name="city" type='text' placeholder="City" required />
          </div>
          <div class ="edit">
            Education: <input onChange={(e) => onChange(e)} id="education" name="education" type='text' placeholder="Education" required />
          </div>
          <div class ="edit">
            Hobbies: <input onChange={(e) => onChange(e)} id="hobbies" name="hobbies" type='text' placeholder="Hobbies" required />
          </div>
          <div class ="edit">
            Image: <input onChange={imageUpload} type='file'/>
          </div>
          <br></br>
          <div class ="email">
              <button type="submit" className="form-btn btn btn-primary" onClick={() => cancelEdit()}> Cancel</button>
              <br></br>
              <button type="submit" className="form-btn btn btn-primary" onClick={(e) => onSubmit(e)}> Submit</button>
          </div>
          <div class = "description" style={{color:'red', margin: '10px 0' }}>{error}</div>
          </div>
        ) : (
          <div>
            <div class ="name"> {userInfo.profile_name}
            {userInfo.profile_id === protectedData ? (<button className="edit-btn" onClick={() => setEditMode(true)}> <i class="fas fa-pen"> </i> </button>) : (null)}
            </div>
            <div class = "description" style={{color:'green', margin: '10px 0' }}>{success}</div>

            <div id = "center">
              {images[userInfo.img] !== undefined ? (<img src={images[userInfo.img]} alt="..."/>) :  (<img src={images["default-profile-picture.jpg"]} alt="..."/>)}
            </div>

            <div class ="email"><i class="fas fa-envelope"></i> {userInfo.profile_email} </div>
            <br></br>
            {userInfo.bio != null ? (<div class ="description"> {userInfo.bio} </div>) : (<div class ="description">No Description Listed</div>)}
            <br></br>
            {userInfo.city != null ? (<div class ="description"><i class="fas fa-city"></i> {userInfo.city} </div>) : (<div class ="description"><i class="fas fa-city"></i> No City Listed</div>)}
            {userInfo.education != null ? (<div class ="description"><i class="fas fa-graduation-cap"></i> {userInfo.education} </div>) : (<div class ="description"><i class="fas fa-graduation-cap"></i> No Education Listed</div>)}
            {userInfo.hobbies != null ? (<div class ="description"><i class="fas fa-book"></i> {userInfo.hobbies} </div>) : (<div class ="description"><i class="fas fa-book"></i> No Hobbies Listed</div>)}
            <br></br>
            {
              posts.map(post => {
                // retreive like_id if post is liked by current user
                like_id = postIds.includes(post.post_id) ? likeIds[postIds.indexOf(post.post_id)] : -1
                if(post.user_id ==userInfo.profile_id){
                  return <Post key={post.post_id} userId={user.id} userName={user.name} postData={post} likeId={like_id} reloadPosts={reloadPosts} />
                }
              })
            }
          </div>
        )
      }
    </Layout>
  )
}

export default Profile;