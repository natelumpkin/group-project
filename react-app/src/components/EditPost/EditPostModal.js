import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPostForm from './EditPostForm'

// styling for button is on postcard.css

export default function EditPostModal({ post }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='edit-post-button edit-delete-post interface-text' id='edit-post-button' onClick={() => setShowModal(true)}><i className="fa-solid fa-pencil" /></button>
            {showModal && (
                <Modal id='edit-post-modal' onClose={() => setShowModal(false)} >
                    <EditPostForm setShowModal={setShowModal} showModal={showModal} post={post} />
                </Modal>
            )}
        </>
    );
}
