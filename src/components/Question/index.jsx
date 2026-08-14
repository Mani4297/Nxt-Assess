import ButtonOptionItem from '../ButtonOptionItem'
import ImageOptionItem from '../ImageOptionItem'
import Select from '../Select'

import './index.css'

const Question = props => {
  const {question} = props
  const {question_text: questionText, options_type: optionsType, options} = question

  const renderOptions = () => {
    switch (optionsType) {
      case 'IMAGE':
        return (
          <div className="image-options-container">
            {options.map(option => (
              <ImageOptionItem
                key={option.id}
                option={option}
                questionId={question.id}
              />
            ))}
          </div>
        )
      case 'SINGLE_SELECT':
        return <Select options={options} questionId={question.id} />
      default:
        // DEFAULT type
        return (
          <div className="button-options-container">
            {options.map(option => (
              <ButtonOptionItem
                key={option.id}
                option={option}
                questionId={question.id}
              />
            ))}
          </div>
        )
    }
  }

  return (
    <div className="question-container">
      <p className="question-text">{questionText}</p>
      {renderOptions()}
    </div>
  )
}

export default Question