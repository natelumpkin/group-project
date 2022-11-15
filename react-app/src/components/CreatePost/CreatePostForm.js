import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost, addMediaByPostId } from '../../store/post';
import './CreatePostModal.css'

const CreatePostForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState([]);
    const [postType, setPostType] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [titleCharCount, setTitleCharCount] = useState(0);
    const [textCharCount, setTextCharCount] = useState(0);
    const [mediaCharCount, setMediaCharCount] = useState(0)
    const dispatch = useDispatch();

    //--------------------------------------------------
    // Current functionality:
    // Text and quote types work as expected.
    // If the form has media, the post will be created,
    // but the API will return a 500 when attempting
    // to add media.
    //
    // Also .catch blocks seem to not function properly:
    // "Unhandled Rejection (TypeError): res.json is not a function"
    //--------------------------------------------------
    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const postData = {
            postType,
            title,
            text
        }

        // console.log("*******POST DATA SUBMITTED: ", postData)
        // console.log("*******POST MEDIA SUBMITTED: ", mediaUrl)

        /* Removed because probably redundant: */
        // if (postData.title.length > 100) {
        //     errors.append("Title must be 100 characters or less");
        // }
        // if (postData.text.length > 1000) {
        //     errors.append("Text must be 1000 characters or less");
        // }
        // if (mediaUrl.length > 255) {
        //     errors.append("Media URL must be 255 characters or less");
        // }
        // if (errors.length) {
        // }

        const post = await dispatch(createPost(postData))
            .catch(async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
        // console.log("*******NEW POST RETURNED: ", post)
        if (post && !mediaUrl) {
            setShowModal(false)
        }
        if (post && mediaUrl) {
            const postMedia = await dispatch(addMediaByPostId(post.id, mediaUrl))
                .catch(async (response) => {
                    const data = await response.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
            // console.log("*******NEW MEDIA RETURNED: ", postMedia)
            if (postMedia) {
                setShowModal(false)
            }
        }
    };

    return (
        <div>
            {!postType && (
                <>
                    <div id='post-type-selector'>
                        <div className='selector-wrapper' onClick={() => setPostType('text')}>
                            <div id='text-selector'>Aa</div>
                            <div id='text-label'>Text</div>
                        </div>
                        <div className='selector-wrapper' onClick={() => setPostType('image')}>
                            <div id='image-selector'><i className="fa-solid fa-camera-retro" /></div>
                            <div id='image-label'>Photo</div>
                        </div>
                        <div className='selector-wrapper' onClick={() => setPostType('quote')}>
                            <div id='quote-selector' ><i class="fa-solid fa-quote-left" /></div>
                            <div id='quote-label'>Quote</div>
                        </div>
                        <div className='selector-wrapper' onClick={() => setPostType('video')}>
                            <div id='video-selector'><i class="fa-solid fa-video" /></div>
                            <div id='video-label'>Video</div>
                        </div>
                    </div>
                </>
            )}


            {/* // ---------- POST FORM FOR TEXT ---------- \\ */}
            {postType === 'text' && (
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            name='title'
                            type='text'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setTitleCharCount(e.target.value.length)
                            }}
                            maxLength={100}
                            onFocus={(e) => setTitleCharCount(e.target.value.length)}
                            required
                        />
                        <div>{titleCharCount}/100</div>
                    </div>
                    <div>
                        <input
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setTextCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setTextCharCount(e.target.value.length)}
                            required
                        />
                        <div>{textCharCount}/1000</div>
                    </div>
                    <button type="submit">Post Now</button>
                </form>
            )}


            {/* // ---------- POST FORM FOR IMAGE ---------- \\ */}
            {postType === 'image' && (
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            name='image'
                            type='url'
                            placeholder='Type or paste image link'
                            value={mediaUrl}
                            onChange={(e) => {
                                setMediaUrl(e.target.value)
                                setMediaCharCount(e.target.value.length)
                            }}
                            maxLength={255}
                            onFocus={(e) => setMediaCharCount(e.target.value.length)}
                            required
                        />
                        <div>{mediaCharCount}/255</div>
                    </div>
                    <div>
                        <input
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setTextCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setTextCharCount(e.target.value.length)}
                        />
                        <div>{textCharCount}/1000</div>
                    </div>
                    <button type="submit">Post Now</button>
                </form>
            )}


            {/* // ---------- POST FORM FOR QUOTE ---------- \\ */}
            {postType === 'quote' && (
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            name='quote'
                            type='text'
                            placeholder='Something someone else said here.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setTextCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setTextCharCount(e.target.value.length)}
                            required
                        />
                        <div>{textCharCount}/1000</div>
                    </div>
                    <button type="submit">Post Now</button>
                </form>
            )}


            {/* // ---------- POST FORM FOR VIDEO ---------- \\ */}
            {postType === 'video' && (
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            name='video'
                            type='url'
                            placeholder='Type or paste video link'
                            value={mediaUrl}
                            onChange={(e) => {
                                setMediaUrl(e.target.value)
                                setMediaCharCount(e.target.value.length)
                            }}
                            maxLength={255}
                            onFocus={(e) => setMediaCharCount(e.target.value.length)}
                            required
                        />
                        <div>{mediaCharCount}/255</div>
                    </div>
                    <div>
                        <input
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setTextCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setTextCharCount(e.target.value.length)}
                            required
                        />
                        <div>{textCharCount}/1000</div>
                    </div>
                    <button type="submit">Post Now</button>
                </form>
            )}
        </div>
    );
};

export default CreatePostForm;
