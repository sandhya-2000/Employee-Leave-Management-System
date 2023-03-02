import React from 'react'

function AlertMessage({text, color}) {
  return (
    <div>
      <p style={{color:color}}>{text}</p>
    </div>
  )
}

export default AlertMessage