import React, { useEffect } from 'react';
import { Modal } from '../../context/Modal';

import DeleteComment from '.';
import './EditComment.css'

export default function EditCommentModal({ comment, showEditModal, setShowEditModal }) {

  useEffect(() => {
    if (showEditModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [showEditModal])

  return (
    <>
      {showEditModal && (
        <Modal id='create-post-modal' onClose={() => setShowEditModal(false)} >
          <DeleteComment comment={comment} setShowEditModal={setShowEditModal} />
        </Modal>
      )}
    </>
  );
}
