import { Link } from 'react-router'
import './NotFound.css'

const NotFound = () => {
  return (
    <>
      <h1>Oops! Page not found.</h1>
      <Link to="/">Back to home</Link>
    </>
  )
}

export default NotFound