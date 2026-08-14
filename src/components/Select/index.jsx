import {useContext} from 'react'

import EvaluationContext from '../../context/EvaluationContext'

import './index.css'

const Select = props => {
  const {options, questionId} = props
  const {answers, updateAnswer} = useContext(EvaluationContext)

  const onChangeOption = event => {
    updateAnswer(questionId, event.target.value)
  }

  return (
    <select
      className="select-input"
      value={answers[questionId]}
      onChange={onChangeOption}
    >
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.text}
        </option>
      ))}
    </select>
  )
}

export default Select