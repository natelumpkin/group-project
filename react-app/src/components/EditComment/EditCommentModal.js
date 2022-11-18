import React, {useEffect} from 'react';
import { Modal } from '../../context/Modal';

import DeleteComment from '.';
import './EditComment.css'

export default function EditCommentModal({comment, showEditModal, setShowEditModal}) {

    useEffect(() => {
        if (showEditModal) {
          //console.log('setting no scroll on body in profile button')
          document.body.style.overflow = 'hidden';
        }
        return () => {
          //console.log('running clean up of useeffect in profile button')
          document.body.style.overflow = 'unset';
        }
      },[showEditModal])

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
