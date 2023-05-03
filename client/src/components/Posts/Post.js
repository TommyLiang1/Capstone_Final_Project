import React, {useState, useEffect, useRef} from "react";
import { addLikePost, removeLikePost, deletePost, editPost } from "../../api/post";
import { getCommentsByPostId, createComment} from "../../api/comment";
import { useNavigate } from "react-router-dom";
import { likePostFromUser, unlikePostFromUser, getCommentsLikedByUser } from "../../api/like";
import Comment from "../Comments/Comment";
import Modal from "../Modal";


import '../../styles/Post.css';

const Post = (props) => {
  const { post_id, post_name, description_text, likes, comments, user_id, created_at } = props.postData;
  const reloadPosts = props.reloadPosts;
  const [commentVisibility, setCommentVisibility] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [editPostText, setEditPostText] = useState(description_text);
  const [editPostError, setEditPostError] = useState("");
  const comment = useRef("");
  const [commentError, setCommentError] = useState("");
  const initialLikeId = props.likeId;
  const initialColor = props.likeId === -1 ? "black" : "blue";
  const [likeId, setLikeId] = useState(initialLikeId);
  const [likeColor, setLikeColor] = useState(initialColor);
  const [commentIds, setCommentIds] = useState([]);
  const [likeIds, setLikeIds] = useState([]);
  
  let navigate = useNavigate(); 

  // Like Post
  const likePost = async(e) => {
    e.preventDefault()
    let likeData = {
        userId: props.userId,
        postId: post_id
      }
    if(likeColor === 'black') {
      await addLikePost(post_id)
      await likePostFromUser(likeData).then((res) => {
        setLikeId(res.data.likeId)
      })
    } else {
      await removeLikePost(post_id)
      await unlikePostFromUser(likeId).then(() => {
        setLikeId(-1)
      })
    }
    setLikeColor(likeColor === 'black' ? 'blue' : 'black')
    reloadPosts()
  }

  // Toggle View Comment Button
  const toggleCommentVisibility = () => {
    setCommentVisibility(!commentVisibility);
  }

  // Delete Post
  const handleDeletePost = async(e) => {
    e.preventDefault();
    await deletePost(post_id).then(() => reloadPosts())
  }

  // Edit Post
  const handleEditPost = async(e) => {
    e.preventDefault();
    if(editPostText === "") {
      setEditPostError("Post is empty!")
      return;
    } else if (description_text === editPostText) {
      setOpenPostModal(false)
      return;
    }
    let editPostData = {
      message: editPostText
    }
    await editPost(post_id, editPostData).then(() => {
      setEditPostError("");
      setOpenPostModal(false);
      reloadPosts();
    });
  }

  // Create Comment
  const handleCreateComment = async(e) => {
    e.preventDefault();
    if(comment.current.value === "") {
      setCommentError("Please enter a comment!")
      return;
    }
    let commentData = {
      id: props.userId,
      username: props.userName,
      comment: comment.current.value
    }
    await createComment(post_id, commentData)
      .then(() => {
        comment.current.value = "";
        setCommentError("")
        setOpenCommentModal(false);
        getComments();
        reloadPosts();
      })
  }

  // Get All Comments
  const getComments = async () => {
    await getCommentsByPostId(post_id)
      .then(res => {
        setPostComments(res.data.comments)
      });
  }

  // Get commentIds like by User
  const getCommentIds = async () => {
    await getCommentsLikedByUser(props.userId)
      .then(res => {
        if(res.data.commentIds.length === 0) return;
        let tmpCommentIds = [];
        let tmpLikeIds = [];
        res.data.commentIds.forEach(commentId => {
          tmpCommentIds = [...tmpCommentIds, commentId.comment_id]
          tmpLikeIds = [...tmpLikeIds, commentId.like_id]
        })
        setCommentIds(tmpCommentIds)
        setLikeIds(tmpLikeIds)
      })
  }

  useEffect(() => {
    getComments();
    getCommentIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(initialLikeId !== -1) {
      setLikeId(initialLikeId);
      setLikeColor("blue");
    }
  }, [initialLikeId])

// Function that goes to user profile when their username is clicked
 function toProfile() {
  let path = `/profile/${user_id}`; 
  navigate(path);
 }

 // Imports profile images
 function importAll(r) {
  let images = [];
  r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}
  const images = importAll(require.context('../images', false, ));


  return (
    <div className="post-container">
      <div className="post-header">
      <img className="post-profile-img" src={images["profile-picture-" + user_id]} alt="..."/>
        <h5 className="post-name" onClick={toProfile}> {post_name} </h5>
        {
          props.userName === post_name && 
          <div className="extra">
            <span className="timeposted">{created_at}</span>
            <button className="post-edit-btn" onClick={() => setOpenPostModal(true)}>Edit</button>
            <button className="post-delete-btn" onClick={(e) => handleDeletePost(e)}>Delete</button>
          </div>
        }
      </div>
     
      <div styles={{position: 'relative', zindex: 1}}>
        {/* EDIT POST MODAL */}
        <Modal open={openPostModal}
          closeModal={() => {
            setEditPostText(description_text)
            setEditPostError("")
            setOpenPostModal(false)
          }}
        >
          <h5>{post_name}</h5>
          <textarea className='edit-post-text' value={editPostText} onChange={(e) => setEditPostText(e.target.value)}></textarea>
          <div style={{color:'red', margin: '5px 0px' }}>{editPostError}</div>
          <button className='edit-post-btn' onClick={(e) => handleEditPost(e)}>Edit Post</button>
        </Modal>

        {/* CREATE COMMENT MODAL */}
        <Modal
          open={openCommentModal}
          closeModal={() => {
            setCommentError("")
            setOpenCommentModal(false)
          }}
        >
          <div className="modal-comments">
            <h5>{post_name}</h5>
            <div>{description_text}</div>
            <textarea className='edit-post-text' ref={comment} placeholder="Write your comment here."></textarea>
            <div style={{color:'red', margin: '5px 0' }}>{commentError}</div>
            <button className='edit-post-btn' onClick={(e) => handleCreateComment(e)}>Comment</button>
            {
              postComments.map(comment => {
                return (
                  <div key={comment.comment_id}>
                    <Comment commentData={comment} userName={props.userName} reloadPosts={props.reloadPosts} getComments={getComments} modal={true}/>
                  </div>
                )
              })
            }
          </div>
        </Modal>
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
        <button className="lc-btn" style={{color: likeColor}} onClick={(e) => likePost(e)}>Like</button>
        <button className="lc-btn" onClick={() => setOpenCommentModal(true)}>Comment</button>
      </div>
      <button className="vc-btn" onClick={() => toggleCommentVisibility()} hidden={postComments.length === 0 ? true : false}>View comments</button>
      {
        postComments.map(comment => {
          let like_id;
          like_id = commentIds.includes(comment.comment_id) ? likeIds[commentIds.indexOf(comment.comment_id)] : -1
          return (
            <div key={comment.comment_id} hidden={!commentVisibility}>
              <Comment commentData={comment} userId={props.userId} userName={props.userName} likeId={like_id} reloadPosts={props.reloadPosts} getComments={getComments} modal={false}/>
            </div>
          )
        })
      }
    </div>
  );
};

export default Post;