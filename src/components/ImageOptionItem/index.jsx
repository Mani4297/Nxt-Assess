import {useContext} from 'react'

import EvaluationContext from '../../context/EvaluationContext'

import './index.css'

const ImageOptionItem = props => {
  const {option, questionId} = props
  const {answers, updateAnswer} = useContext(EvaluationContext)

  const isSelected = answers[questionId] === option.id

  const onSelectOption = () => {
    updateAnswer(questionId, option.id)
  }

  return (
    <button
      type="button"
      className={`image-option-button ${
        isSelected ? 'selected-image-option' : ''
      }`}
      onClick={onSelectOption}
    >
      <img src={option.image_url} alt={option.text} className="option-image" />
    </button>
  )
}

export default ImageOptionItem