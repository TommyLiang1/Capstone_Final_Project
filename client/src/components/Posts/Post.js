import React, {useState, useEffect} from "react";
// import { addLikePost, removeLikePost } from "../../api/post";
import { getCommentsByPostId } from "../../api/comment";
import Comment from "../Comments/Comment";

import '../../styles/Post.css';

// document.addEventListener("click", e => {
//   const isDropDownButton = e.target.matches("[data-dropdown-button]")
//   if(!isDropDownButton && e.target.closest('[data-dropdown]') != null) return

//   let currentDropDown
//   if(isDropDownButton) {
//     currentDropDown = e.target.closest('[data-dropdown]')
//     currentDropDown.classList.toggle('active')
//   }

//   document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
//     if(dropdown === currentDropDown) return
//     dropdown.classList.remove('active')
//   })
// })

const Post = (props) => {
  const { post_id, post_name, description_text, likes, comments } = props.postData;
  const [commentVisibility, setCommentVisibility] = useState(false);
  const [postComments, setPostComments] = useState([]);

  const likePost = (e) => {
    e.preventDefault()
    e.target.style.color = e.target.style.color === 'black' ? 'blue' : 'black'
    // if(e.target.style.color === 'black')
    //   removeLikePost(post_id)
    // else
    //   addLikePost(post_id)
    // props.ReloadPosts();
  }
  
  const dropdown = (e) => {
    e.preventDefault()
  }

  const toggleCommentVisibility = () => {
    setCommentVisibility(!commentVisibility);
  }

  const loadComments = async () => {
    await getCommentsByPostId(post_id)
      .then(res => {
        setPostComments(res.data.comments)
      });
  }

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="post-container">
      <div className="post-header">
        <h5 className="post-name"> {post_name} </h5>
        <div className="dropdown">
          <button className="dropdown-btn" onClick={(e) => dropdown(e)}>...</button>
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
      <div className="lc">
        <span className="like">{likes} likes</span>
        <span className="comment">{comments} comments</span>
      </div>
      <hr className="lc-btn-sep"/>
      <div className="lc-btn-container">
        <button className="lc-btn" color={'black'} onClick={(e) => likePost(e)}>Like</button>
        <button className="lc-btn" onClick={(e) => test(e)}>Comment</button>
      </div>
      <button className="vc-btn" onClick={() => toggleCommentVisibility()}>View comments</button>
      {
        postComments.length > 0 ?
        postComments.map(comment => {
          return <Comment key={comment.comment_id} commentData={comment} hidden={!commentVisibility} />
        }) : <div hidden={!commentVisibility}>No Comments</div>
      }
    </div>
  );
};

export default Post;