import {useContext} from 'react'

import QuestionNumberItem from '../QuestionNumberItem'
import EvaluationContext from '../../context/EvaluationContext'

import './index.css'

const QuestionPalette = () => {
  const {questionsList, currentQuestionIndex, answers, goToQuestion} =
    useContext(EvaluationContext)

  return (
    <div className="question-palette-container">
      <p className="palette-heading">Questions</p>
      <div className="question-numbers-list">
        {questionsList.map((question, index) => {
          const isAnswered = answers[question.id] !== undefined
          const isActive = index === currentQuestionIndex

          const onClickNumber = () => {
            goToQuestion(index)
          }

          return (
            <QuestionNumberItem
              key={question.id}
              questionNumber={index + 1}
              isAnswered={isAnswered}
              isActive={isActive}
              onClickNumber={onClickNumber}
            />
          )
        })}
      </div>
    </div>
  )
}

export default QuestionPalette