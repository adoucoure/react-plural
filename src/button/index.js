'use client'
import React from 'react'

export default (props) => {
  const { children, } = props
  if (!process.env.BROWSER) {
    return null
  }

  return <button type="button" {...props}>
    {children}
  </button>
}
