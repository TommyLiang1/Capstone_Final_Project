import React, { useEffect, useState } from "react";
import { editProfile } from "../api/profile";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/profile";
import { fetchProtectedInfo } from "../api/auth";
import axios from 'axios';

import '../styles/Profile.css';

const Profile = () => {
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
    const {data} = await getProfile(id);
    setUserInfo({
      profile_id: data.profile.profile_id,
      profile_name: data.profile.profile_name,
      profile_email: data.profile.profile_email,
      img: data.profile.img,
      city: data.profile.city,
      bio: data.profile.bio,
      education: data.profile.education,
      hobbies: data.profile.hobbies,
    });
    
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
      setProtectedData(data.info)
    } catch (err) {
    }
  }

  useEffect(() => {
    retrieveInfo()
    protectedInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      {
        editMode ? (
          <div>
          <div className="name"> Edit Profile </div>
          <div className="edit">
            Username: <input onChange={(e) => onChange(e)} id="profile_name" name="profile_name" type='text' placeholder="Username" required />
          </div>
          <div className="edit">
            Bio: <input onChange={(e) => onChange(e)} id="bio" name="bio" type='text' placeholder="Bio" required />
          </div>
          <div className="edit">
            City: <input onChange={(e) => onChange(e)} id="city" name="city" type='text' placeholder="City" required />
          </div>
          <div className="edit">
            Education: <input onChange={(e) => onChange(e)} id="education" name="education" type='text' placeholder="Education" required />
          </div>
          <div className="edit">
            Hobbies: <input onChange={(e) => onChange(e)} id="hobbies" name="hobbies" type='text' placeholder="Hobbies" required />
          </div>
          <div className="edit">
            Image: <input onChange={imageUpload} type='file'/>
          </div>
          <br></br>
          <div className="email">
              <button type="submit" className="form-btn btn btn-primary" onClick={() => cancelEdit()}> Cancel</button>
              <br></br>
              <button type="submit" className="form-btn btn btn-primary" onClick={(e) => onSubmit(e)}> Submit</button>
          </div>
          <div className="description" style={{color:'red', margin: '10px 0' }}>{error}</div>
          </div>
        ) : (
          <div>
            <div className="name"> {userInfo.profile_name}
            <button className="edit-btn" onClick={() => setEditMode(true)}> <i className="fas fa-pen"></i> </button>
            {/* {userInfo.profile_id === protectedData ? (<button className="edit-btn" onClick={() => setEditMode(true)}> <i class="fas fa-pen"> </i> </button>) : (null)} */}
            </div>
            <div className= "description" style={{color:'green', margin: '10px 0' }}>{success}</div>

            <div id="center">
              {images[userInfo.img] !== undefined ? (<img src={images[userInfo.img]} alt="..."/>) :  (<img src={images["default-profile-picture.jpg"]} alt="..."/>)}
            </div>

            <div className="email"><i className="fas fa-envelope"></i> {userInfo.profile_email} </div>
            <br></br>
            {userInfo.bio != null ? (<div className="description"> {userInfo.bio} </div>) : (<div className="description">No Description Listed</div>)}
            <br></br>
            {userInfo.city != null ? (<div className="description"><i className="fas fa-city"></i> {userInfo.city} </div>) : (<div className="description"><i className="fas fa-city"></i> No City Listed</div>)}
            {userInfo.education != null ? (<div className="description"><i className="fas fa-graduation-cap"></i> {userInfo.education} </div>) : (<div className="description"><i className="fas fa-graduation-cap"></i> No Education Listed</div>)}
            {userInfo.hobbies != null ? (<div className="description"><i className="fas fa-book"></i> {userInfo.hobbies} </div>) : (<div className="description"><i className="fas fa-book"></i> No Hobbies Listed</div>)}
          </div>
        )
      }
    </Layout>
  )
}

export default Profile;