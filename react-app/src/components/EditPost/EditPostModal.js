import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from './EditPostForm'

export default function EditPostModal({ post }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id='edit-post-button' onClick={() => setShowModal(true)}><i class="fa-solid fa-pencil" /></div>
            {showModal && (
                <Modal id='edit-post-modal' onClose={() => setShowModal(false)} >
                    <EditPostForm setShowModal={setShowModal} post={post} />
                </Modal>
            )}
        </>
    );
}
