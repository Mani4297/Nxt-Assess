import {useContext} from 'react'

import Timer from '../Timer'
import QuestionPalette from '../QuestionPalette'
import EvaluationContext from '../../context/EvaluationContext'

import './index.css'

const AssessmentConfiguration = props => {
  const {remainingSeconds, onSubmitAssessment} = props
  const {answeredCount, unansweredCount} = useContext(EvaluationContext)

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
        className="submit-assessment-button"
        onClick={onSubmitAssessment}
      >
        Submit Assessment
      </button>
    </div>
  )
}

export default AssessmentConfiguration