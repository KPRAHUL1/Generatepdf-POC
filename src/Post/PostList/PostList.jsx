import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllpost } from '../../slices/postSlice'

export const PostList = () => {
    const posts= useSelector(selectAllpost);
    const renderList = posts.map(post =>(
<div key={post.id}>
                <h1>{post.title}</h1>
                <p>{post.author}</p>
                <p>{post.content} </p>
            </div>
    ))
  return (
    <div>
        <h1 className='text-xl font-semibold'>Posts</h1>
        <div>
      {renderList}    
        </div>
        </div>
  )
}
