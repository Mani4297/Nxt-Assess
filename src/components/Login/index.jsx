import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  // If the user already has a valid token, sending them back to Login
  // makes no sense - redirect straight to Home instead.
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  const handleUsernameChange = event => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleShowPasswordChange = event => {
    setShowPassword(event.target.checked)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setErrorMsg('')
    setIsLoading(true)

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok === true) {
        // Token is valid for 30 days, same as the CCBP login pattern
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        navigate('/')
      } else {
        setErrorMsg(data.error_msg)
      }
    } catch (error) {
      setErrorMsg('Something went wrong. Please try again.')
    }

    setIsLoading(false)
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="logo-container">
          <svg viewBox="0 0 260 100" className="logo-svg" aria-label="Nxt Assess logo">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#7c3aed', stopOpacity: 1}} />
              </linearGradient>
            </defs>
            <rect x="8" y="12" width="72" height="72" rx="12" fill="url(#logoGradient)" />
            <text x="44" y="66" fontSize="46" fontWeight="700" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif">N</text>
            <text x="104" y="52" fontSize="34" fontWeight="700" fill="#1e293b" fontFamily="Arial, sans-serif">nxt</text>
            <text x="104" y="76" fontSize="16" fontWeight="600" fill="#64748b" fontFamily="Arial, sans-serif">assess</text>
          </svg>
        </div>

        <div className="input-container">
          <label htmlFor="username" className="input-label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="input-field"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password" className="input-label">
            PASSWORD
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={handleShowPasswordChange}
          />
          <label htmlFor="showPassword" className="checkbox-label">
            Show Password
          </label>
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {errorMsg !== '' && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login