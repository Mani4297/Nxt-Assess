import { useNavigate } from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => {
  const navigate = useNavigate()

  const handleStartAssessment = () => {
    navigate('/assessment')
  }

  return (
    <div className="home-page">
      <Header />
      <div className="home-content">
        <div className="home-text-section">
          <h1 className="home-heading">Simple and easy assessment platform</h1>
          <p className="home-description">
            You will be given ten questions of different types within a time
            limit of 10 minutes. Answer as many questions as you can to
            achieve a good score.
          </p>
          <button
            type="button"
            className="start-assessment-button"
            onClick={handleStartAssessment}
          >
            Start Assessment
          </button>
        </div>
        <div className="home-illustration">
          <svg viewBox="0 0 400 350" className="illustration-svg">
            {/* Background circle */}
            <circle cx="200" cy="160" r="140" fill="#f0f4ff" opacity="0.6" />
            
            {/* Desk/Table */}
            <rect x="80" y="220" width="240" height="12" rx="6" fill="#cbd5e1" />
            <rect x="90" y="232" width="8" height="40" rx="4" fill="#94a3b8" />
            <rect x="302" y="232" width="8" height="40" rx="4" fill="#94a3b8" />
            
            {/* Person - Head */}
            <circle cx="200" cy="100" r="20" fill="#f4a261" />
            
            {/* Person - Body */}
            <rect x="185" y="125" width="30" height="45" rx="8" fill="#4f46e5" />
            
            {/* Person - Left arm */}
            <rect x="155" y="135" width="32" height="10" rx="5" fill="#f4a261" />
            
            {/* Person - Right arm holding pen */}
            <rect x="213" y="135" width="35" height="10" rx="5" fill="#f4a261" />
            <circle cx="250" cy="140" r="4" fill="#7c3aed" />
            
            {/* Question Paper/Clipboard */}
            <rect x="130" y="165" width="90" height="70" rx="4" fill="#ffffff" stroke="#4f46e5" strokeWidth="2" />
            
            {/* Question marks on paper */}
            <text x="155" y="190" fontSize="24" fill="#4f46e5" fontWeight="bold">?</text>
            <text x="165" y="215" fontSize="20" fill="#7c3aed" fontWeight="bold">?</text>
            <text x="175" y="225" fontSize="18" fill="#4f46e5" fontWeight="bold">?</text>
            
            {/* Checkmark - Success indicator */}
            <circle cx="280" cy="155" r="22" fill="#16a34a" opacity="0.9" />
            <path d="M 270 155 L 278 163 L 290 151" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Timer/Clock */}
            <circle cx="140" cy="100" r="18" fill="#fbbf24" opacity="0.8" />
            <circle cx="140" cy="100" r="14" fill="none" stroke="#ffffff" strokeWidth="2" />
            <line x1="140" y1="92" x2="140" y2="88" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            <line x1="140" y1="100" x2="146" y2="100" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            
            {/* Decorative stars */}
            <polygon points="320,80 324,90 335,92 326,101 328,112 320,107 312,112 314,101 305,92 316,90" fill="#fbbf24" opacity="0.7" />
            <polygon points="100,50 103,57 111,58 105,64 107,72 100,68 93,72 95,64 89,58 97,57" fill="#7c3aed" opacity="0.6" />
            
            {/* Purple gradient accent line */}
            <defs>
              <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#7c3aed', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <path d="M 80 320 Q 200 340 320 320" stroke="url(#accentGradient)" strokeWidth="3" fill="none" opacity="0.5" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Home