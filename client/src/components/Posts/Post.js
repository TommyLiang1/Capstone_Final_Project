import React from "react";

import '../../styles/Post.css';

const Post = (props) => {
  const { post_id, post_name, description_text, likes, comments } = props.postData;
  return (
    <div className="post-container">
      <div>
        {post_name}
      </div>
      <div className="message-container">
        <div className="message">
          {description_text}
        </div>
      </div>
      <div>
        <span className="like-comment">{likes} like</span>
        <span className="like-comment">{comments} comments</span>
      </div>
    </div>  
  );
};

export default Post;