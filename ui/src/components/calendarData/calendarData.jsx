import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './calendarData.css'
import {
  dietIcon,
  indoorWorkoutIcon,
  noCheatMealIcon,
  outdoorWorkoutIcon,
  progressPictureIcon,
  readIcon,
  waterGallonIcon,
} from '../../assets/icons'

export const CalendarData = ({ date, dayData }) => {
  // Create new opject and copy dayData defore destructuring, this prevents an error when dayData is undefined
  const {
    diet,
    indoorWorkout,
    noAlcoholOrCheatMeal,
    oneGallonOfWater,
    outdoorWorkout,
    progressPicture,
    read,
  } = { ...dayData }
  // Number of checkboxes in the form
  const numInputs = 7
  // Local state to keep track of how many checkboxes are checked
  const [numTrueInputs, setNumTrueInputs] = useState(0)

  // Each time the state is changed for a checkbox recacluate how many are checked
  useEffect(() => {
    if (dayData !== undefined) {
      setNumTrueInputs(
        Object.values(dayData).filter((inputVal) => inputVal === true).length
      )
    }
  }, [
    diet,
    indoorWorkout,
    noAlcoholOrCheatMeal,
    oneGallonOfWater,
    outdoorWorkout,
    progressPicture,
    read,
  ])

  return (
    <div
      className='calendarDataContainer'
      style={
        numTrueInputs === numInputs ? { backgroundColor: '#CCC9E7' } : undefined
      }>
      <div className='dayHeader'>
        <div className='calendarDate'>{date}</div>
        <div className='dayProgressContainer'>
          {numTrueInputs > 0 && (
            <div className='dayProgress'>
              {numTrueInputs}/{numInputs}
            </div>
          )}
        </div>
      </div>
      <div className='dayBody'>
        {diet && <img src={dietIcon} alt='follow a diet' className='dayIcon' />}
        {indoorWorkout && (
          <img
            src={indoorWorkoutIcon}
            alt='Indoor workout'
            className='dayIcon'
          />
        )}
        {outdoorWorkout && (
          <img
            src={outdoorWorkoutIcon}
            alt='Progress picture'
            className='dayIcon'
          />
        )}
        {noAlcoholOrCheatMeal && (
          <img src={noCheatMealIcon} alt='No cheat meal' className='dayIcon' />
        )}
        {oneGallonOfWater && (
          <img
            src={waterGallonIcon}
            alt='Outdoor workout'
            className='dayIcon'
          />
        )}
        {progressPicture && (
          <img src={progressPictureIcon} alt='Read' className='dayIcon' />
        )}
        {read && (
          <img src={readIcon} alt='Gallon of water' className='dayIcon' />
        )}
      </div>
    </div>
  )
}

CalendarData.propTypes = {
  date: PropTypes.number.isRequired,
  dayData: PropTypes.object,
}
