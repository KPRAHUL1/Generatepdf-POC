import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { postAdded } from '../../slices/postSlice'


export const AddPost = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const dispatch = useDispatch();
   
    
    return (
        <div className='flex flex-col gap-5'>
            <h1 className='text-xl font-semibold text-center'>Add a New Post</h1>
            <form onSubmit={(e) => {
        e.preventDefault();
        if (title && author && content) { // Ensure fields are not empty
            dispatch(postAdded(title, author, content));
            setTitle(""); setAuthor(""); setContent(""); // Clear input fields after submission
        }
    }} action="" className='flex flex-col gap-3 justify-center items-center'>
                <label htmlFor="" className='flex gap-3'>Post Title<input type="text" className='border' value={title} onChange={(e) => setTitle(e.target.value)} /></label>
                <label htmlFor="" className='flex gap-3'>Author <input type="text" className='border' value={author} onChange={(e) => setAuthor(e.target.value)} /></label>
                <label htmlFor="" className='flex gap-3'>Content: <textarea
                    name=""
                    id=""
                    className='border'
                    value={content}  
                    onChange={(e) => setContent(e.target.value)}
                />
                </label>
                <button type="submit" className='flex justify-start border rounded-lg items-center px-3'>
    Save Post
</button>

            </form></div>
    )
}
