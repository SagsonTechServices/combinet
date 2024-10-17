import React from 'react'
import { useNavigate } from 'react-router-dom';

function PostGrid({blogs}) {
  const navigate = useNavigate();
  return (
    <div className='grid lg:grid-cols-3 grid-cols-2 gap-2'>
      {
        blogs.map((blog) => {
          function handleRedirection(){
            navigate('/blog', {state: blog._id});
          }
            return(
                <div className='relative overflow-hidden cursor-pointer hover:translate-y-1 hover:shadow-md duration-100'>
                <img src={blog.thumbnail} className='w-full h-full object-cover rounded-lg' alt="" onClick={handleRedirection}/>
                </div>
            );
        })
      }
    </div>
  )
}

export default PostGrid
