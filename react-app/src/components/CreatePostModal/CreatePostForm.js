import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';

const CreatePostForm = () => {
    const [errors, setErrors] = useState([]);
    const [postType, setPostType] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('')
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const onSubmit = async (e) => {
        e.preventDefault();
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
                </form>
            )}

        </div>
    );
};

export default CreatePostForm;
