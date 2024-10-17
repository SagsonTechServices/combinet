import React from 'react'

function ActionBtn({text, action}) {
  return (
    <div>
      <button type="button" className='btn btn-primary' onClick={action}>{text}</button>
    </div>
  )
}

export default ActionBtn
