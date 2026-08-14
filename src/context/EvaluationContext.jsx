import {createContext} from 'react'

const EvaluationContext = createContext({
  questionsList: [],
  currentQuestionIndex: 0,
  answers: {},
  answeredCount: 0,
  unansweredCount: 0,
  score: 0,
  timeTaken: 0,
  assessmentStatus: 'IN_PROGRESS',
  initializeQuestions: () => {},
  updateAnswer: () => {},
  goToNextQuestion: () => {},
  goToQuestion: () => {},
  finishAssessment: () => {},
  resetAssessment: () => {},
})

export default EvaluationContext