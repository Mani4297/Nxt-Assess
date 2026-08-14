import {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'

import Header from '../Header'
import Question from '../Question'
import AssessmentConfiguration from '../AssessmentConfiguration'
import EvaluationContext from '../../context/EvaluationContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const TOTAL_SECONDS = 10 * 60 // 10 minute assessment duration

const Assessment = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [remainingSeconds, setRemainingSeconds] = useState(TOTAL_SECONDS)

  const navigate = useNavigate()

  const {
    questionsList,
    currentQuestionIndex,
    initializeQuestions,
    goToNextQuestion,
    finishAssessment,
  } = useContext(EvaluationContext)

  const getQuestions = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const url = 'https://apis.ccbp.in/assess/questions'

    try {
      const response = await fetch(url)

      if (response.ok === true) {
        const data = await response.json()
        initializeQuestions(data.questions)
        setRemainingSeconds(TOTAL_SECONDS)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getQuestions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Countdown interval - only runs once questions have loaded successfully.
  useEffect(() => {
    if (apiStatus !== apiStatusConstants.success) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setRemainingSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId)
          return 0
        }
        return prevSeconds - 1
      })
    }, 1000)

    // Cleanup: this runs when the component unmounts (e.g. navigating away)
    // or before the effect re-runs - this is what stops multiple intervals.
    return () => clearInterval(intervalId)
  }, [apiStatus])

  // Watches for the timer reaching zero and ends the assessment automatically.
  useEffect(() => {
    if (remainingSeconds === 0 && apiStatus === apiStatusConstants.success) {
      finishAssessment('TIME_UP', TOTAL_SECONDS)
      navigate('/results')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds])

  const onClickRetry = () => {
    getQuestions()
  }

  const onClickNextQuestion = () => {
    goToNextQuestion()
  }

  const onSubmitAssessment = () => {
    const secondsElapsed = TOTAL_SECONDS - remainingSeconds
    finishAssessment('SUBMITTED', secondsElapsed)
    navigate('/results')
  }

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <div className="loader" />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-assess-failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something went wrong. Please try again.</p>
      <button type="button" className="retry-button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => {
    const currentQuestion = questionsList[currentQuestionIndex]
    const isLastQuestion = currentQuestionIndex === questionsList.length - 1

    return (
      <div className="assessment-layout">
        <div className="assessment-main">
          <Question question={currentQuestion} />
          {isLastQuestion === false && (
            <button
              type="button"
              className="next-question-button"
              onClick={onClickNextQuestion}
            >
              Next Question
            </button>
          )}
        </div>
        <AssessmentConfiguration
          remainingSeconds={remainingSeconds}
          onSubmitAssessment={onSubmitAssessment}
        />
      </div>
    )
  }

  const renderAssessmentContent = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="assessment-page">
      <Header />
      <div className="assessment-content">{renderAssessmentContent()}</div>
    </div>
  )
}

export default Assessment