import React, { useState } from "react";
import List from "../ActivityList.json"
import "../styles/Activities.css";


const Activities = () => {
  const [flip, setFlip] = useState(false)

  return(
    <div>
      <h1>Hello World</h1>
      <br></br>
      {
        List.map(activity => {
          return(
            <div className={`card ${flip ? "flip" : ""}`} key={activity.id} onClick={() => setFlip(!flip)}>
              <div className="front">
                {activity.name}
              </div>
              <div className="back">
                {activity.detail}
              </div>
              {flip ? activity.detail : activity.name}
            </div>
          )
        })
      }
    </div>
  )
}

export default Activities;
