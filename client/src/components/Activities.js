import React, { useState } from "react";
import Layout from "./Layout";
import List from "../ActivityList.json"
import "../styles/Activities.css";

const Activities = () => {
  return(
    <Layout>   
      <h1 className="activity-header">Mental Health Activities</h1>
      <br></br>
      <div className="card-grid">
        {
          List.map(activity => {
            return(
              <Activity key={activity.id} name={activity.name} detail={activity.detail}/>
            )
          })
        }
      </div>
    </Layout>
  )
}

const Activity = (props) => {
  const [flip, setFlip] = useState(false)
  return(
    <div className={`card ${flip ? "flip" : ""}`} onClick={() => setFlip(!flip)}>
      <div className="front">
        {props.name}
      </div>
      <div className="back">
        {props.detail}
      </div>
    </div>
  )
}

export default Activities;
