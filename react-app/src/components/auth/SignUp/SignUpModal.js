import React from 'react';
import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm'

export default function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Sign Up</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
}
