import React from 'react'
import SVG from './SVG'

function Input({type, value, placeholder, name, onChangeMethod, svgType}) {
  function handleOnFocus(){
    const label = document.getElementById(name);
    label.classList.add('text-primary');
    label.classList.add('font-bold');
  }

  function handleOnBlur(){
    const label = document.getElementById(name);
    label.classList.remove('text-primary');
    label.classList.remove('font-bold');
  }

  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
            <SVG type={svgType}></SVG>
            <input type={type} className="grow" name={name} onFocus={handleOnFocus} onBlur={handleOnBlur} placeholder={placeholder} onChange={onChangeMethod} value={value} />
          </label>
    </div>
  )
}

export default Input
