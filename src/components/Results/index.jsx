
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
  const {questionsList, answers, score, timeTaken, assessmentStatus, resetAssessment} =
    useContext(EvaluationContext)

  const navigate = useNavigate()

  const onClickReattempt = () => {
    resetAssessment()
    navigate('/assessment')
  }

  const totalQuestions = questionsList.length
  const isTimeUp = assessmentStatus === 'TIME_UP'

  const reviewItems = questionsList.map((question, index) => {
    const selectedOptionId = answers[question.id]
    const selectedOption = question.options.find(
      option => option.id === selectedOptionId,
    )
    const correctOption = question.options.find(option => option.is_correct === 'true')
    const isCorrect = selectedOption !== undefined && selectedOption.is_correct === 'true'
    const isUnanswered = selectedOption === undefined

    return {
      id: question.id,
      number: index + 1,
      questionText: question.question_text,
      selectedAnswer: selectedOption ? selectedOption.text : 'Not answered',
      correctAnswer: correctOption ? correctOption.text : 'N/A',
      status: isUnanswered ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect',
      note: isCorrect
        ? 'This answer is correct. Review the logic and keep this approach in mind for similar questions.'
        : isUnanswered
          ? 'This question was left unanswered. Try to review the concept and attempt it next time.'
          : `Incorrect selection. The correct answer is “${correctOption?.text || 'the right option'}”. Review the concept behind this question.`,
    }
  })

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

        <div className="results-review-panel">
          <div className="results-review-header">
            <h2>Answer Review</h2>
            <p>Check each answer and the quick feedback for every question.</p>
          </div>

          <div className="results-review-list">
            {reviewItems.map(item => (
              <div key={item.id} className={`review-result-item ${item.status.toLowerCase()}`}>
                <div className="review-result-topbar">
                  <span className="review-question-number">Q{item.number}</span>
                  <span className={`review-result-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </div>

                <p className="review-question-text">{item.questionText}</p>

                <p className="review-answer-row">
                  <span className="review-label">Selected:</span> {item.selectedAnswer}
                </p>

                <p className="review-answer-row">
                  <span className="review-label">Correct:</span> {item.correctAnswer}
                </p>

                <p className="review-note">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results