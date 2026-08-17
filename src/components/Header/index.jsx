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
        <svg viewBox="0 0 220 90" className="logo-svg" aria-label="Nxt Assess logo">
          <defs>
            <linearGradient id="headerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#7c3aed', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          <rect x="8" y="12" width="62" height="62" rx="10" fill="url(#headerLogoGradient)" />
          <text x="39" y="58" fontSize="40" fontWeight="700" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">N</text>
          <text x="90" y="48" fontSize="28" fontWeight="700" fill="#1e293b" fontFamily="Arial, sans-serif">nxt</text>
          <text x="90" y="68" fontSize="14" fontWeight="600" fill="#64748b" fontFamily="Arial, sans-serif">assess</text>
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