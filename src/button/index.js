
export default (props) => {
  const { children, } = props
  const isServer = (typeof window === 'undefined') //&& !process.browser
  if (isServer) {
    return null
  }

  return <button type="button" {...props}>
    {children}
  </button>
}
