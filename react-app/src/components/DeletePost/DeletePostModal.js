import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';

import DeletePost from ".";

// Styling for button is on postcard.css

export default function DeletePostModal({post}) {
  const [showModal, setShowModal] = useState(false);

  return (
      <>
          <button className='delete-post-button edit-delete-post' onClick={() => setShowModal(true)}><i className="fa-solid fa-trash-can"></i></button>
          {showModal && (
              <Modal id='create-post-modal' onClose={() => setShowModal(false)} >
                  <DeletePost setShowModal={setShowModal} post={post}/>
              </Modal>
          )}
      </>
  );
}
