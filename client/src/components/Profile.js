import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getProfile, editProfile } from "../api/profile";
import { fetchProtectedInfo, getUserById } from "../api/auth";
import Post from "./Posts/Post";
import Layout from "./Layout";
import { getPosts } from "../api/post";
import { getPostsLikedByUser } from "../api/like";
import axios from 'axios';

import '../styles/Profile.css';

const Profile = () => {
  const {id} = useParams();
  const [posts, setPosts] = useState([])
  const [postIds, setPostIds] = useState([]);
  const [likeIds, setLikeIds] = useState([]);  
  let like_id = -1;

  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState('');
  const editName = useRef(null);
  const editCity = useRef(null);
  const editEducation = useRef(null);
  const editBio = useRef(null);
  const editHobby = useRef(null);
  const [editImgUrl, setEditImgUrl] = useState('');

  const [currentUser, setCurrentUser] = useState({
    id: '',
    name: '',
    email: '',
  })

  const [userInfo, setUserInfo] = useState({
    user_id: '',
    user_name: '',
    user_email: '',
    img: '',
    city: '',
    education: '',
    bio: '',
    hobbies: ''
  })

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
        setCurrentUser({
          id: res.data.user[0].user_id,
          name: res.data.user[0].user_name,
          email: res.data.user[0].user_email
        })  
      })
      .catch((err) => {
        console.log(err)
      })

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

  const isFileImage = (file) => {
    return file && file['type'].split('/')[0] === 'image';
  }

  const imageUpload = (e) => {
    if(e.target.files[0].name === undefined || !isFileImage(e.target.files[0])){
      return;
    }
    console.log(e.target.files[0].name)
    setEditImgUrl("profile-picture-" + userInfo.user_id)
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

    let editUserInfo = {
      user_id: userInfo.user_id,
      user_name: editName.current.value === userInfo.user_name ? '' : editName.current.value,
      img: editImgUrl === '' ? userInfo.img : editImgUrl,
      city: editCity.current.value === '' ? userInfo.city : editCity.current.value,
      education: editEducation.current.value === '' ? userInfo.education : editEducation.current.value,
      bio: editBio.current.value === '' ? userInfo.bio : editBio.current.value,
      hobbies: editHobby.current.value === '' ? userInfo.hobbies : editHobby.current.value
    }
    try {
      const res = await editProfile(id, editUserInfo)
      setError('')
      setSuccess(res.data.message)
      setUserInfo({
        user_id: userInfo.user_id,
        user_name: editUserInfo.user_name === '' ? userInfo.user_name : editUserInfo.user_name,
        user_email: userInfo.user_email,
        img: editImgUrl,
        city: editUserInfo.city,
        education: editUserInfo.education,
        bio: editUserInfo.bio,
        hobbies: editUserInfo.hobbies
      })
      reloadPosts();
      setEditMode(false);
    } 
    catch (err) {
      setError(err.response.data.message)
      setSuccess('')
    }
    retrieveInfo()
  }

  const cancelEdit = () => {
    setEditMode(false);
    setError('');
    setSuccess()
  }

  const retrieveInfo = async () => {
    await getProfile(id)
      .then(res => {
        setUserInfo({
          user_id: res.data.profile[0].user_id,
          user_name: res.data.profile[0].user_name,
          user_email: res.data.profile[0].user_email,
          img: res.data.profile[0].img,
          city: res.data.profile[0].city,
          education: res.data.profile[0].education,
          bio: res.data.profile[0].bio,
          hobbies: res.data.profile[0].hobbies
        })  
      })
  }

  function importAll(r) {
    let images = [];
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('./images', false, ));

  useEffect(() => {
    retrieveInfo()
    getUserInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    editMode ? (
      <Layout>
        <div className="edit">
          <div className="name"> Edit Profile </div>
          <div className="edit-item">
            <label className="edit-item-label">Username</label>
            <input ref={editName} id="profile_name" name="profile_name" type='text' placeholder={userInfo.user_name} required />
          </div>
          <div className="edit-item">
            <label className="edit-item-label">City</label>
            <input ref={editCity} id="city" name="city" type='text' placeholder={userInfo.city} required />
          </div>
          <div className="edit-item">
            <label className="edit-item-label">Education</label>
            <input ref={editEducation} id="education" name="education" type='text' placeholder={userInfo.education} required />
          </div>
          <div className="edit-item">
            <label className="edit-item-label">Bio</label>
            <input ref={editBio} id="bio" name="bio" type='text' placeholder={userInfo.bio} required />
          </div>
          <div className="edit-item">
            <label className="edit-item-label">Hobbies</label>
            <input ref={editHobby} id="hobbies" name="hobbies" type='text' placeholder={userInfo.hobbies} required />
          </div>
          <div className="edit-item">
            <label className="edit-item-label">Image</label>
            <input onChange={imageUpload} type='file'/>
          </div>
          <div className="description" style={{color:'red', margin: '10px 0px' }}>{error}</div>
          <button type="submit" className="form-btn btn btn-primary m-2" onClick={() => cancelEdit()}> Cancel</button>
          <br />
          <button type="submit" className="form-btn btn btn-primary" onClick={(e) => onSubmit(e)}> Submit</button>
        </div>
      </Layout>
    ) : (
      <Layout>
        <div className="flex-container">
          <div className="section">
            <div className="name"> 
              {userInfo.user_name}
              {userInfo.user_id === currentUser.id ? (<button className="edit-btn" onClick={() => setEditMode(true)}> <i className="fas fa-pen"> </i> </button>) : (null)}
            </div>
            <div className="description" style={{color:'green', margin: '10px 0' }}>{success}</div>

            <div id="center">
              {images[userInfo.img] !== undefined ? (<img src={images[userInfo.img]} alt="..."/>) :  (<img src={images["default-profile-picture.jpg"]} alt="..."/>)}
            </div>
          </div>

          <div className="section">
            <div className="email"><i className="fas fa-envelope"></i> {userInfo.user_email} </div>
            <br />
            {userInfo.bio != null ? (<div className="description"> {userInfo.bio} </div>) : (<div className="description">No Description Listed</div>)}
            <br />
            {userInfo.city != null ? (<div className="description"><i className="fas fa-city"></i> {userInfo.city} </div>) : (<div className="description"><i className="fas fa-city"></i> No City Listed</div>)}
            {userInfo.education != null ? (<div className="description"><i className="fas fa-graduation-cap"></i> {userInfo.education} </div>) : (<div className="description"><i className="fas fa-graduation-cap"></i> No Education Listed</div>)}
            {userInfo.hobbies != null ? (<div className="description"><i className="fas fa-book"></i> {userInfo.hobbies} </div>) : (<div className="description"><i className="fas fa-book"></i> No Hobbies Listed</div>)}
          </div>
        </div>
        <br />
        { 
          posts.filter(post => {
            if(post.user_id === userInfo.user_id) return true;
            return false;
          }).length > 0 && <h5 className="profile-post-header">Your Posts</h5>
        }
        {
          posts.filter(post => {
              if(post.user_id === userInfo.user_id) return true;
              return false;
            })
            .map(post => {
              like_id = postIds.includes(post.post_id) ? likeIds[postIds.indexOf(post.post_id)] : -1
              return <Post key={post.post_id} userId={currentUser.id} userName={currentUser.name} postData={post} likeId={like_id} reloadPosts={reloadPosts} />
            })            
        }
        <br />
      </Layout>  
    )      
  )
}

export default Profile;