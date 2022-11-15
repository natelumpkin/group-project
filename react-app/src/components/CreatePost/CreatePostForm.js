import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const CreatePostForm = () => {
    const [errors, setErrors] = useState([]);
    const [postType, setPostType] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [mediaUrl, setMediaUrl] = useState('');
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

            {postType === 'text' && (
                // ---------- POST FORM FOR TEXT ---------- \\
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            name='title'
                            type='text'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button type="submit">Post Now</button>
                </form>
            )}

            {postType === 'image' && (
                // ---------- POST FORM FOR IMAGE ---------- \\
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            name='image'
                            type='text'
                            placeholder='Type or paste image link'
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <button type="submit">Post Now</button>
                </form>
            )}

            {postType === 'quote' && (
                // ---------- POST FORM FOR QUOTE ---------- \\
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            name='quote'
                            type='text'
                            placeholder='Something someone else said here.'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                    <button type="submit">Post Now</button>
                </form>
            )}

            {postType === 'video' && (
                // ---------- POST FORM FOR VIDEO ---------- \\
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            name='video'
                            type='text'
                            placeholder='Type or paste video link'
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            name='text'
                            type='text'
                            placeholder='Go ahead, put anything.'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    <button type="submit">Post Now</button>
                </form>
            )}
        </div>
    );
};

export default CreatePostForm;
