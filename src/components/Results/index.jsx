
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import Header from '../Header'
import EvaluationContext from '../../context/EvaluationContext'

import './index.css'

const formatTimeTaken = totalSeconds => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}

const Results = () => {
  const {questionsList, score, timeTaken, assessmentStatus, resetAssessment} =
    useContext(EvaluationContext)

  const navigate = useNavigate()

  const onClickReattempt = () => {
    resetAssessment()
    navigate('/assessment')
  }

  const totalQuestions = questionsList.length
  const isTimeUp = assessmentStatus === 'TIME_UP'

  return (
    <div className="results-page">
      <Header />
      <div className="results-content">
        <div className="results-card">
          <div className={`results-icon ${isTimeUp ? 'time-up-icon' : 'success-icon'}`}>
            {isTimeUp ? (
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            ) : (
              <svg className="icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>

          <h1 className="results-heading">
            {isTimeUp ? "Time's Up!" : 'Assessment Submitted'}
          </h1>

          <p className="results-score">
            Score: <span className="score-value">{score}</span> / {totalQuestions}
          </p>

          {isTimeUp === false && (
            <p className="results-time-taken">
              Time Taken: {formatTimeTaken(timeTaken)}
            </p>
          )}

          <button
            type="button"
            className="reattempt-button"
            onClick={onClickReattempt}
          >
            Reattempt
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results