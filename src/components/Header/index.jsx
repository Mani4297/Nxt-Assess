import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="header-container">
      <div className="header-logo">
        <svg viewBox="0 0 200 80" className="logo-svg">
          <defs>
            <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#7c3aed', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="50" height="50" rx="6" fill="url(#headerLogoGradient)" />
          <text x="35" y="48" fontSize="32" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">N</text>
          <text x="72" y="42" fontSize="22" fontWeight="700" fill="#1e293b" fontFamily="Arial, sans-serif">nxt</text>
          <text x="72" y="60" fontSize="11" fontWeight="600" fill="#64748b" fontFamily="Arial, sans-serif">assess</text>
        </svg>
      </div>

      <button
        type="button"
        className="logout-button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  )
}

export default Header