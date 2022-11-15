import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from './CreatePostForm'

export default function CreateFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create Post</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <CreatePostForm />
                </Modal>
            )}
        </>
    );
}
