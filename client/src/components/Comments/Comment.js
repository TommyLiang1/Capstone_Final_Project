import React, {useState, useEffect} from "react";
import { deleteComment, editComment, addLikeComment, removeLikeComment } from "../../api/comment";
import { likeCommentFromUser, unlikeCommentFromUser } from "../../api/like";
import Modal from "../Modal";

import '../../styles/Comment.css';

const Comment = (props) => {
  const { comment_id, comment_name, description_text, likes } = props.commentData;

  // Edit comment modal state
  const [openEditCommentModal, setOpenEditCommentModal] = useState(false);

  // Create comment states
  const [editCommentText, setEditCommentText] = useState(description_text);
  const [editCommentError, setEditCommentError] = useState("");

  // Like comment states
  const initialLikeId = props.likeId;
  const initialColor = props.likeId === -1 ? "black" : "blue";
  const [likeId, setLikeId] = useState(initialLikeId);
  const [likeColor, setLikeColor] = useState(initialColor);

  // Like Comment
  const likeComment = async(e) => {
    e.preventDefault()
    let likeData = {
        userId: props.userId,
        commentId: comment_id
      }
    if(likeColor === 'black') {
      await addLikeComment(comment_id)
      await likeCommentFromUser(likeData).then((res) => {
        setLikeId(res.data.likeId)
      })
    } else {
      await removeLikeComment(comment_id)
      await unlikeCommentFromUser(likeId).then(() => {
        setLikeId(-1)
      })
    }
    setLikeColor(likeColor === 'black' ? 'blue' : 'black')
    props.getComments()
  }

  // Delete Comment
  const handleDeleteComment = async(e) => {
    e.preventDefault();
    await deleteComment(comment_id)
      .then(() => {
        props.getComments()
        props.reloadPosts()
      })
  }

  // Edit Comment
  const handleEditComment = async(e) => {
    e.preventDefault();
    if(editCommentText === "") {
      setEditCommentError("Comment is empty!")
      return;
    } else if (description_text === editCommentText) {
      setOpenEditCommentModal(false)
      return;
    }
    let editCommentData = {
      message: editCommentText
    }
    await editComment(comment_id, editCommentData)
      .then(() => {
        setEditCommentError("");
        setOpenEditCommentModal(false);
        props.getComments()
        props.reloadPosts();
      })
  }

  useEffect(() => {
    if(initialLikeId !== -1) {
      setLikeId(initialLikeId);
      setLikeColor("blue");
    }
  }, [initialLikeId])

  return (
    <div className="comment-container">
      <div className="comment-header">
        <h5 className="comment-name"> {comment_name} </h5>
        {
          props.userName === comment_name && !props.modal &&
          <div className="extra">
            <button className="comment-edit-btn" onClick={() => setOpenEditCommentModal(true)}>Edit</button>
            <button className="comment-delete-btn" onClick={(e) => handleDeleteComment(e)}>Delete</button>
          </div>
        }
        <div styles={{position: 'relative', zindex: 1}}>
          {/* EDIT COMMENT MODAL */}
          <Modal open={openEditCommentModal} 
            closeModal={() => {
              setEditCommentText(description_text)
              setEditCommentError("")
              setOpenEditCommentModal(false)
            }}
          >
            <h5>{comment_name}</h5>
            <textarea className='edit-comment-text' value={editCommentText} onChange={(e) => setEditCommentText(e.target.value)}></textarea>
            <div style={{color:'red', margin: '5px 0px' }}>{editCommentError}</div>
            <button className='edit-comment-btn' onClick={(e) => handleEditComment(e)}>Edit Comment</button>
          </Modal>
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
      <button className="l-btn" style={{color: likeColor}} onClick={(e) => likeComment(e)}>Like</button>
    </div>
  );
};

export default Comment;