import React from 'react'
import Comment from '../utils/Comment'
import empty from '../../assets/images/empty.png'

function Comments({comments}) {
  if(comments.length != 0){
    return (
      <div className="container py-7 comments-container rounded-xl max-w-screen-2xl md:px-20 h-96 bg-secondary px-3 my-3">
        {
            comments.map((comment) => {
                return(
                    <Comment comment={comment}></Comment>
                );
            })
        }
    </div>
  )
  }

  return (
    <div className='text-center'>
      <img src={empty} className='mx-auto' alt="Empty" />
      <h1 className='text-xl font-bold my-3'>No comments yet...</h1>
    </div>
  )
}

export default Comments
