import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createPost, addMediaByPostId } from '../../store/post';

const CreatePostForm = ({ setShowModal }) => {
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [postType, setPostType] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [charCount, setCharCount] = useState(0);
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
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });
        // console.log("*******NEW POST RETURNED: ", post)
        if (post && !mediaUrl) {
            setShowModal(false)
            history.push("/");
        }
        if (post && mediaUrl) {
            const postMedia = await dispatch(addMediaByPostId(post.id, mediaUrl))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(Object.values(data.errors));
                });
            // console.log("*******NEW MEDIA RETURNED: ", postMedia)
            if (postMedia) {
                setShowModal(false)
                history.push("/");
            }
        }
    };

    return (
        <div>
            {!postType && (
                <div id='post-type-selector'>
                    <div onClick={() => setPostType('text')}>Text</div>
                    <div onClick={() => setPostType('image')}>Photo</div>
                    <div onClick={() => setPostType('quote')}>Quote</div>
                    <div onClick={() => setPostType('video')}>Video</div>
                </div>
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
                                setCharCount(e.target.value.length)
                            }}
                            maxLength={100}
                            onFocus={(e) => setCharCount(e.target.value.length)}
                            required
                        />
                        <div>{charCount}/100</div>
                    </div>
                    <div>
                        <input
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setCharCount(e.target.value.length)}
                            required
                        />
                        <div>{charCount}/1000</div>
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
                                setCharCount(e.target.value.length)
                            }}
                            maxLength={255}
                            onFocus={(e) => setCharCount(e.target.value.length)}
                            required
                        />
                        <div>{charCount}/255</div>
                    </div>
                    <div>
                        <input
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setCharCount(e.target.value.length)}
                        />
                        <div>{charCount}/1000</div>
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
                                setCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setCharCount(e.target.value.length)}
                            required
                        />
                        <div>{charCount}/1000</div>
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
                                setCharCount(e.target.value.length)
                            }}
                            maxLength={255}
                            onFocus={(e) => setCharCount(e.target.value.length)}
                            required
                        />
                        <div>{charCount}/255</div>
                    </div>
                    <div>
                        <input
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value)
                                setCharCount(e.target.value.length)
                            }}
                            maxLength={1000}
                            onFocus={(e) => setCharCount(e.target.value.length)}
                            required
                        />
                        <div>{charCount}/1000</div>
                    </div>
                    <button type="submit">Post Now</button>
                </form>
            )}
        </div>
    );
};

export default CreatePostForm;
