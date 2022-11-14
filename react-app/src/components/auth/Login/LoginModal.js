import React from 'react';
import { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginForm from './LoginForm';

export default function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Login</button>
            {showModal && (
                // <h2>HELLO!</h2>
                <Modal onClose={() => setShowModal(false)} >
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}
