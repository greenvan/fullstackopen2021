import React from 'react'

const Button = ({text,value, name, onClick}) =>  <button value={value}  name={name} onClick={onClick}>
      {text}
    </button>

export default Button;