import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';

import DeletePost from ".";

export default function DeletePostModal({post}) {
  const [showModal, setShowModal] = useState(false);

  return (
      <>
          <button onClick={() => setShowModal(true)}><i class="fa-solid fa-trash-can"></i></button>
          {showModal && (
              <Modal id='create-post-modal' onClose={() => setShowModal(false)} >
                  <DeletePost setShowModal={setShowModal} post={post}/>
              </Modal>
          )}
      </>
  );
}
