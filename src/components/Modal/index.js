import React, { useState } from 'react';
import './styles.scss';

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return (
    <>
    <div className="modalOverlay" onClick={() => toggleModal()} key="modalOverlay"/>
    <div className="modalWrap" key="modalWrap">
      <div className="modal">
        {children}
      </div>
    </div>
    </>
  );
}

export default Modal;