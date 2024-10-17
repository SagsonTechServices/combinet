import React from 'react'
import Card1 from '../utils/Card1'

function Categories({categories, clickHandler}) {
  return (
    <div className='categories-container flex gap-4 px-10 z-10 fixed lg:top-0 top-16 h-20 pt-7 bg-base-100 lg:left-72 left-0'>
      <Card1 category={'All'} clickHandler={clickHandler}></Card1>
      {categories.map((category) => {
        return <Card1 category={category.name} key={category._id} clickHandler={clickHandler}></Card1>
      })}
    </div>
  )
}

export default Categories
