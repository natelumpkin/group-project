import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/post';
import './CreatePostModal.css'

const CreatePostForm = ({ setShowModal, post }) => {
    const [errors, setErrors] = useState([]);
    const [title, setTitle] = useState(post.title);
    const [text, setText] = useState(post.text)
    // const [mediaUrl, setMediaUrl] = useState('');
    const [titleCharCount, setTitleCharCount] = useState(0);
    const [textCharCount, setTextCharCount] = useState(0);
    // const [mediaCharCount, setMediaCharCount] = useState(0)
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const postData = {
            title,
            text
        }

        const post = await dispatch(updatePost(post.id, postData))
            .catch(async (response) => {
                const data = await response.json();
                if (data && data.errors) setErrors(Object.values(data.errors));
            });

        if (post) setShowModal(false)
    };

    return (
        <div>
            {/* // ---------- POST FORM FOR TEXT ---------- \\ */}
            {postType === 'text' && (
                <form onSubmit={onSubmit}>
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
                    <div>
                        <input
                            name='title'
                            type='text'
                            placeholder='Author'
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
                    <button type="submit">Post Now</button>
                </form>
            )}


            {/* // ---------- POST FORM FOR VIDEO ---------- \\ */}
            {postType === 'video' && (
                <form onSubmit={onSubmit}>
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
