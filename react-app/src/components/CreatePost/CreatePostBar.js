import React from 'react';
import { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePostForm from './CreatePostForm'
import './CreatePostModal.css'
import './CreatePostBar.css'

export default function CreateFormBarModal() {
    const [showModal, setShowModal] = useState(false);
    const [postType, setPostType] = useState(false);

    return (
        <>
            <div id='selection-bar'>
                <div id='bar-post-type-selector'>
                    <div className='selector-wrapper' onClick={() => {
                        setShowModal(true)
                        setPostType('text')
                    }}>
                        <div id='bar-text-selector'>Aa</div>
                        <div id='text-label'>Text</div>
                    </div>
                    <div className='selector-wrapper' onClick={() => {
                        setShowModal(true)
                        setPostType('image')
                    }}>
                        <div id='bar-image-selector'><i className="fa-solid fa-camera-retro" /></div>
                        <div id='image-label'>Photo</div>
                    </div>
                    <div className='selector-wrapper' onClick={() => {
                        setShowModal(true)
                        setPostType('quote')
                    }}>
                        <div id='bar-quote-selector' ><i class="fa-solid fa-quote-left" /></div>
                        <div id='quote-label'>Quote</div>
                    </div>
                    <div className='selector-wrapper' onClick={() => {
                        setShowModal(true)
                        setPostType('video')
                    }}>
                        <div id='bar-video-selector'><i class="fa-solid fa-video" /></div>
                        <div id='video-label'>Video</div>
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal id='create-post-modal' onClose={() => setShowModal(false)} >
                    <CreatePostForm setShowModal={setShowModal} typeSelection={postType} />
                </Modal>
            )}
        </>
    );
}
