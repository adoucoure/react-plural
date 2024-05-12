import React from 'react'

export default (props) => {
  const { children, } = props

  return <h1 {...props}>
    {children}
  </h1>
}
