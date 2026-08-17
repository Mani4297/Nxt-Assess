import {useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Assessment from './components/Assessment'
import Results from './components/Results'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import EvaluationContext from './context/EvaluationContext'

import './App.css'

const App = () => {
  const [questionsList, setQuestionsList] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [answeredCount, setAnsweredCount] = useState(0)
  const [unansweredCount, setUnansweredCount] = useState(0)
  const [score, setScore] = useState(0)
  const [timeTaken, setTimeTaken] = useState(0)
  const [assessmentStatus, setAssessmentStatus] = useState('IN_PROGRESS')

  // Called once when the questions API succeeds.
  // No questions are pre-answered - users must answer all questions
  const initializeQuestions = questions => {
    setQuestionsList(questions)
    setAnswers({})
    setAnsweredCount(0)
    setUnansweredCount(questions.length)
    setCurrentQuestionIndex(0)
  }

  // Shared by ButtonOptionItem, ImageOptionItem and Select.
  // Counts only change the FIRST time a question gets an answer.
  // Shared by ButtonOptionItem, ImageOptionItem and Select.
  // Counts only change the FIRST time a question gets an answer.
  const updateAnswer = (questionId, optionId) => {
    const isFirstTimeAnswering = answers[questionId] === undefined

    setAnswers(prevAnswers => ({...prevAnswers, [questionId]: optionId}))

    if (isFirstTimeAnswering) {
      setAnsweredCount(prevCount => prevCount + 1)
      setUnansweredCount(prevCount => prevCount - 1)
    }
  }

  const goToNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1)
  }

  const goToQuestion = index => {
    setCurrentQuestionIndex(index)
  }

  // Called both when Submit Assessment is clicked AND when the timer hits 0.
  // status is either 'SUBMITTED' or 'TIME_UP'.
  const finishAssessment = (status, secondsElapsed) => {
    let calculatedScore = 0

    questionsList.forEach(question => {
      const selectedOptionId = answers[question.id]
      const selectedOption = question.options.find(
        option => option.id === selectedOptionId,
      )

      if (selectedOption !== undefined && selectedOption.is_correct === 'true') {
        calculatedScore += 1
      }
    })

    setScore(calculatedScore)
    setTimeTaken(secondsElapsed)
    setAssessmentStatus(status)
  }

  // Called when Reattempt is clicked. Resets everything so the next
  // visit to /assessment starts completely fresh.
  const resetAssessment = () => {
    setQuestionsList([])
    setCurrentQuestionIndex(0)
    setAnswers({})
    setAnsweredCount(0)
    setUnansweredCount(0)
    setScore(0)
    setTimeTaken(0)
    setAssessmentStatus('IN_PROGRESS')
  }

  const evaluationContextValue = {
    questionsList,
    currentQuestionIndex,
    answers,
    answeredCount,
    unansweredCount,
    score,
    timeTaken,
    assessmentStatus,
    initializeQuestions,
    updateAnswer,
    goToNextQuestion,
    goToQuestion,
    finishAssessment,
    resetAssessment,
  }

  return (
    <BrowserRouter>
      <EvaluationContext.Provider value={evaluationContextValue}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assessment"
            element={
              <ProtectedRoute>
                <Assessment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </EvaluationContext.Provider>
    </BrowserRouter>
  )
}

export default App