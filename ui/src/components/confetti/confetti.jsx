import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactConfetti from 'react-confetti'

export const Confetti = ({ onComplete }) => {
  // Initialize local state with the current window dimentions, this will be used by React Confetti
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const determineWindowDimensions = () => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  // Create an event listener to update the window size if it is resized
  useEffect(() => {
    window.addEventListener('resize', determineWindowDimensions)
    return () => window.removeEventListener('resize', determineWindowDimensions)
  }, [])

  return (
    <ReactConfetti
      width={windowDimensions.width}
      heigth={windowDimensions.height}
      tweenDuration={3000}
      numberOfPieces={2500}
      recycle={false}
      onConfettiComplete={onComplete}
    />
  )
}

Confetti.propTypes = {
  onComplete: PropTypes.func.isRequired,
}
