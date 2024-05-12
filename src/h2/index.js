import React from 'react'

export default (props) => {
  const { children, } = props

  return <h2 {...props}>
    {children}
  </h2>
}
