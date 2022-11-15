import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import { createPost, addMediaByPostId } from '../../store/post';

const CreatePostForm = () => {
    const [errors, setErrors] = useState([]);
    const [postType, setPostType] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
    const [charCount, setCharCount] = useState(0);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const postData = {
            postType,
            title,
            text
        }

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

        console.log("POST DATA SUBMITTED: ", postData, mediaUrl)
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
                            // Add setCharCount:
                            onChange={(e) => {
                                setTitle(e.target.value)
                                setCharCount(e.target.value.length)
                            }}
                            // Add all of this:
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
