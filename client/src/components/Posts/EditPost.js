import React from "react";
import ReactDOM from "react-dom";

import '../../styles/EditPost.css';

const MODAL_STYLES = {
  width:  '50%',
  height: '50%',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '20px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(100, 100, 100, 0.7)',
  zIndex: 1000
}


const EditPost = (props) => {
  if(!props.open) return null

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES}/>
      <div style={MODAL_STYLES}>
        <button className="close-modal-btn" onClick={props.closeModal}>Close Modal</button>
        <div className="modal-child">{props.children}</div>
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default EditPost;