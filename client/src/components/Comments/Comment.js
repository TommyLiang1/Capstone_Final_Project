import React from "react";

import '../../styles/Comment.css';

const Comment = (props) => {
  // console.log(props.commentData)
  const { comment_id, comment_name, description_text, likes } = props.commentData;
  return (
    <div className="comment-container">
      <div className="comment-header">
        <h5 className="comment-name"> {comment_name} </h5>
        <div className="dropdown">
          <button className="dropdown-btn">...</button>
          <div className="dropdown-menu">
            <button className="dropdown-item">Edit</button>
            <button className="dropdown-item">Delete</button>
          </div>
        </div>
      </div>
      <div className="message-container">
        <div className="message">
          {description_text}
        </div>
      </div>
      <div className="l">
        <span className="like">{likes} likes</span>
      </div>
      <hr className="l-btn-sep"/>
      <div className="l-btn-container">
        <span></span>
        <button className="l-btn" color={'black'}>Like</button>
      </div>
    </div>
  );
};

export default Comment;