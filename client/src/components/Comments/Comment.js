import React from "react";

const Comment = (props) => {
  // console.log(props.commentData)
  const { visibility } = props.hidden; 
  const { comment_id, comment_name, description_text, likes } = props.commentData;
  return (
    <div hidden = {!visibility}>
      <h1>Comment</h1>
    </div>
  );
};

export default Comment;