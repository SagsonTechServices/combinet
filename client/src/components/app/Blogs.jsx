import React from 'react'
import Card2 from '../utils/Card2'

function Blogs({blogs}) {
  return (
    <div className='container grid lg:grid-cols-3 grid-cols-1 gap-6 lg:my-28 my-36 z-20'>
        {blogs.map((blog) => {
            return(
                <Card2 key={blog._id} blog={blog}></Card2>
            );
        })}
    </div>
  )
}

export default Blogs
