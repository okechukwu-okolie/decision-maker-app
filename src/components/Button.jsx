import React from 'react'

const Button = ({ onClick, disabled = false, title, styling}) => {
  
  return (
    
       <button
            className = {styling}
            onClick={onClick}
            disabled={disabled}
          >
            {title}
            
          </button>
    
  )
}

export default Button
