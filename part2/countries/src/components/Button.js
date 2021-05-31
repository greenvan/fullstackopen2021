import React from 'react'

const Button = ({text,value, onClick}) =>  <button value={value}  onClick={onClick}>
      {text}
    </button>

export default Button;