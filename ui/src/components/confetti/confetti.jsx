import { useState, useEffect } from 'react'
import ReactConfetti from 'react-confetti'

export const Confetti = ({ setShowConfetti }) => {
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

  useEffect(() => {
    window.addEventListener('resize', determineWindowDimensions)
    return () => window.removeEventListener('resize', determineWindowDimensions)
  }, [])

  return (
    <ReactConfetti
      width={windowDimensions.width}
      heigth={windowDimensions.height}
      tweenDuration={10000}
      numberOfPieces={2500}
      recycle={false}
      onConfettiComplete={() => setShowConfetti(false)}
    />
  )
}
