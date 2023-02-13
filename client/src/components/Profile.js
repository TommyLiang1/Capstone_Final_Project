import React, {useEffect} from "react";
import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/auth";

const Profile = () => {
  const { id } = useParams();
  let userInfo = ''; 

  const retrieveInfo = async () => {
    const {data} = await getProfile(id);
    userInfo = data.profile[0];
    console.log(userInfo)   
  }

  useEffect(() => {
    retrieveInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <div>
        Profile {id}
        {userInfo.profile_name}
        {userInfo.profile_email}
        {userInfo.city}
        {userInfo.bio}
        {userInfo.education}
        {userInfo.hobbies}
      </div>
    </Layout>
  )
}

export default Profile;