import './index.css'

const formatTime = totalSeconds => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}

const Timer = props => {
  const {remainingSeconds} = props

  return (
    <div className="timer-container">
      <p className="timer-label">Time Left</p>
      <p className="timer-value">{formatTime(remainingSeconds)}</p>
    </div>
  )
}

export default Timer