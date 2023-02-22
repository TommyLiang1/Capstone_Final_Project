import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/profile";

import '../styles/Profile.css';

const Profile = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState({
    profile_id: '',
    profile_name: '',
    profile_email: '',
    img: '',
    city: '',
    bio: '',
    education: '',
    hobbies: '',
  })

  const retrieveInfo = async () => {
    const {data} = await getProfile(id);
    setUserInfo(data.profile[0]) 
  }

  useEffect(() => {
    retrieveInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <div className="profile-container">
        <div>Profile {userInfo.profile_id}</div>
        <div>{userInfo.profile_name}</div>
        <div>{userInfo.profile_email}</div>
        <div>{userInfo.img}</div>
        <div>{userInfo.city}</div>
        <div>{userInfo.bio}</div>
        <div>{userInfo.education}</div>
        <div>{userInfo.hobbies}</div>
      </div>
    </Layout>
  )
}

export default Profile;