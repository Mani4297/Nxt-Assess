import {useContext, useState} from 'react'

import Timer from '../Timer'
import QuestionPalette from '../QuestionPalette'
import EvaluationContext from '../../context/EvaluationContext'

import './index.css'

const AssessmentConfiguration = props => {
  const {remainingSeconds, onSubmitAssessment} = props
  const {questionsList, answers, answeredCount, unansweredCount} =
    useContext(EvaluationContext)
  const [isReviewOpen, setIsReviewOpen] = useState(false)

  const reviewQuestions = questionsList.map((question, index) => {
    const selectedOptionId = answers[question.id]
    const selectedOption = question.options.find(
      option => option.id === selectedOptionId,
    )

    return {
      id: question.id,
      number: index + 1,
      text: question.question_text,
      answer: selectedOption ? selectedOption.text : 'Not answered',
    }
  })

  return (
    <div className="assessment-configuration-container">
      <Timer remainingSeconds={remainingSeconds} />
      <div className="counts-container">
        <div className="count-item">
          <p className="count-number answered-count">{answeredCount}</p>
          <p className="count-label">Answered</p>
        </div>
        <div className="count-item">
          <p className="count-number unanswered-count">{unansweredCount}</p>
          <p className="count-label">Unanswered</p>
        </div>
      </div>
      <QuestionPalette />

      <button
        type="button"
        className="review-toggle-button"
        onClick={() => setIsReviewOpen(!isReviewOpen)}
      >
        {isReviewOpen ? 'Hide Review' : 'Review Answers'}
      </button>

      {isReviewOpen && (
        <div className="review-panel">
          <div className="review-panel-header">
            <h3>Answer Review</h3>
          </div>

          <div className="review-list">
            {reviewQuestions.map(question => (
              <div key={question.id} className="review-item">
                <div className="review-question-header">
                  <span className="review-question-number">
                    Q{question.number}
                  </span>
                  <span
                    className={`review-status ${
                      question.answer === 'Not answered' ? 'review-pending' : 'review-done'
                    }`}
                  >
                    {question.answer === 'Not answered' ? 'Pending' : 'Done'}
                  </span>
                </div>
                <p className="review-question-text">{question.text}</p>
                <p className="review-answer">
                  <span className="review-answer-label">Answer:</span>{' '}
                  {question.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        className="submit-assessment-button"
        onClick={onSubmitAssessment}
      >
        Submit Assessment
      </button>
    </div>
  )
}

export default AssessmentConfiguration