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
        <img
          src="https://placehold.co/400x300/4f46e5/ffffff?text=Assessment"
          alt="assessment"
          className="home-image"
        />
      </div>
    </div>
  )
}

export default Home