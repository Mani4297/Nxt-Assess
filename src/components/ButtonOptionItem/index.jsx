import {useContext} from 'react'

import EvaluationContext from '../../context/EvaluationContext'

import './index.css'

const ButtonOptionItem = props => {
  const {option, questionId} = props
  const {answers, updateAnswer} = useContext(EvaluationContext)

  const isSelected = answers[questionId] === option.id

  const onSelectOption = () => {
    updateAnswer(questionId, option.id)
  }

  return (
    <button
      type="button"
      className={`option-button ${isSelected ? 'selected-option-button' : ''}`}
      onClick={onSelectOption}
    >
      {option.text}
    </button>
  )
}

export default ButtonOptionItem