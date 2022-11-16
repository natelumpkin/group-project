import React from 'react';
import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import SignUpForm from './SignUpForm';
import "./SignUpModal.css";

export default function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div id="signup-button" onClick={() => setShowModal(true)}>Sign Up</div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <SignUpForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}
