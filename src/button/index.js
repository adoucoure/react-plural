import React from 'react'

export default (props) => {
  const { children, } = props
  return <button type="button" {...props}>
    {children}
  </button>
}
