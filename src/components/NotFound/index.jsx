import {useNavigate} from 'react-router-dom'

import './index.css'

const NotFound = () => {
  const navigate = useNavigate()

  const onClickGoHome = () => {
    navigate('/')
  }

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <img
          src="https://placehold.co/250x250/64748b/ffffff?text=404"
          alt="not found"
          className="not-found-image"
        />
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-description">
          We are sorry, the page you requested could not be found.
        </p>
        <button
          type="button"
          className="go-home-button"
          onClick={onClickGoHome}
        >
          Go To Home
        </button>
      </div>
    </div>
  )
}

export default NotFound