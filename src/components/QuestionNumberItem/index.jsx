import './index.css'

const QuestionNumberItem = props => {
  const {questionNumber, isAnswered, isActive, onClickNumber} = props

  let className = 'question-number-button'
  if (isActive) {
    className += ' active-question-number'
  } else if (isAnswered) {
    className += ' answered-question-number'
  } else {
    className += ' unanswered-question-number'
  }

  return (
    <button type="button" className={className} onClick={onClickNumber}>
      {questionNumber}
    </button>
  )
}

export default QuestionNumberItem