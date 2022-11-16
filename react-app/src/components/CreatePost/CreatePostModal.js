import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from './CreatePostForm'

export default function CreateFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id='create-post-button' onClick={() => setShowModal(true)}><i className="fa-solid fa-pencil" /></div>
            {showModal && (
                <Modal id='create-post-modal' onClose={() => setShowModal(false)} >
                    <CreatePostForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}
