import React, {useState, useEffect} from "react";
// import { addLikePost, removeLikePost } from "../../api/post";
import { getCommentsByPostId, deleteComment } from "../../api/comment";
import { deletePost, editPost } from "../../api/post";
import Comment from "../Comments/Comment";
import EditPost from "./EditPost";

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
  const reloadPosts = props.reloadPosts;
  const [commentVisibility, setCommentVisibility] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editPostText, setEditPostText] = useState(description_text);
  const [editPostError, setEditPostError] = useState("");

  const likePost = (e) => {
    e.preventDefault()
    e.target.style.color = e.target.style.color === 'black' ? 'blue' : 'black'
    // if(e.target.style.color === 'black')
    //   removeLikePost(post_id)
    // else
    //   addLikePost(post_id)
    // props.ReloadPosts();
  }

  const toggleCommentVisibility = () => {
    setCommentVisibility(!commentVisibility);
  }

  const handleDeletePost = async(e) => {
    e.preventDefault();
    await deletePost(post_id).then(() => {
      reloadPosts();
    })
  }

  const handleEditPost = async(e) => {
    e.preventDefault();
    if(editPostText === "") {
      setEditPostError("Post is empty!")
      return;
    } else if (description_text === editPostText) {
      setOpenModal(false);
      return;
    }
    let editPostData = {
      message: editPostText
    }
    await editPost(post_id, editPostData).then(() => {
      setEditPostError("");
      setOpenModal(false);
      reloadPosts();
    });
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
        <button className="dropdown-item" onClick={() => setOpenModal(true)}>Edit</button>
        <button className="dropdown-item" onClick={(e) => handleDeletePost(e)}>Delete</button>
        {/* <div className="dropdown">
          <button className="dropdown-btn">...</button>
          <div className="dropdown-menu">
            <button className="dropdown-item"
              onClick={() => {
                console.log("clicked button")
                setOpenModal(true)
              }
            }>Edit</button>
            <button className="dropdown-item">Delete</button>
          </div>
        </div> */}
      </div>
      
      <div styles={{position: 'relative', zindex: 1}}>
        <EditPost open={openModal}
          closeModal={() => {
            setEditPostText(description_text)
            setEditPostError("")
            setOpenModal(false)
          }}
        >
          <h5>{post_name}</h5>
          <textarea className='edit-post-text' value={editPostText} onChange={(e) => setEditPostText(e.target.value)}></textarea>
          <div style={{color:'red', margin: '5px 0' }}>{editPostError}</div>
          <button className='edit-post-btn' onClick={(e) => handleEditPost(e)}>Edit Post</button>
        </EditPost>
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
      <button className="vc-btn" onClick={() => toggleCommentVisibility()} hidden={postComments.length === 0 ? true : false}>View comments</button>
      {
        postComments.map(comment => {
          return (
            <div key={comment.comment_id} hidden={!commentVisibility}>
              <Comment commentData={comment} />
            </div>
          )
        })
      }
    </div>
  );
};

export default Post;