import React from 'react';
import { Modal } from '../../context/Modal';

import DeleteComment from '.';

export default function EditCommentModal({comment, showEditModal, setShowEditModal}) {


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
