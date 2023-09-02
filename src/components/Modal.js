// Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="material-icons close" onClick={closeModal}>clear</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;