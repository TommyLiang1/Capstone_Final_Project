import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/profile";
import EditProfile from "./EditProfile";

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

  const [editMode, setEditMode] = useState(false);

  const cancelEdit = () => {
    setEditMode(false);
  }

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
      {editMode ? (
        <div>
          <EditProfile cancelEdit={cancelEdit}/>
        </div>
      ) : (
        <div>
          <div class ="name"> {userInfo.profile_name}
          {userInfo.profile_id == 1 ? (<button onClick={() => setEditMode(true)}> <i class="fas fa-pen"> </i> </button>) : (null)}
          </div>
          <div class ="email"><i class="fas fa-envelope"></i> {userInfo.profile_email} </div>
          <br></br>
          {userInfo.bio != null ? (<div class ="description"> {userInfo.bio} </div>) : (<div class ="description">No Description Listed</div>)}
          <br></br>
          {userInfo.city != null ? (<div class ="description"><i class="fas fa-city"></i> {userInfo.city} </div>) : (<div class ="description"><i class="fas fa-city"></i> No City Listed</div>)}
          {userInfo.education != null ? (<div class ="description"><i class="fas fa-graduation-cap"></i> {userInfo.education} </div>) : (<div class ="description"><i class="fas fa-graduation-cap"></i> No Education Listed</div>)}
          {userInfo.hobbies != null ? (<div class ="description"><i class="fas fa-book"></i> {userInfo.hobbies} </div>) : (<div class ="description"><i class="fas fa-book"></i> No Hobbies Listed</div>)}
        </div>
      )
      }
    </Layout>
  )
}

export default Profile;