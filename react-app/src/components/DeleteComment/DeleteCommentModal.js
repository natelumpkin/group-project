import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';

import DeleteComment from '.';

export default function DeleteCommentModal({comment, showDeleteModal, setShowDeleteModal}) {


  return (
      <>
          {showDeleteModal && (
              <Modal id='create-post-modal' onClose={() => setShowDeleteModal(false)} >
                  <DeleteComment comment={comment} setShowDeleteModal={setShowDeleteModal} />
              </Modal>
          )}
      </>
  );
}
