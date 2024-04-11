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
  const {
    diet,
    indoorWorkout,
    noAlcoholOrCheatMeal,
    oneGallonOfWater,
    outdoorWorkout,
    progressPicture,
    read,
  } = {...dayData}

  return (
    <>
      <span className='calendarDate'>{date}</span>
      <div
        className='calendarDataContainer'
        style={
          dayData?.background ? { backgroundColor: '#5BBB60' } : undefined
        }>
        {diet && <img src={dietIcon} alt='follow a diet' className='dayIcon' />}
        {indoorWorkout && (
          <img src={indoorWorkoutIcon} alt='Indoor workout' className='dayIcon' />
        )}
        {noAlcoholOrCheatMeal && (
          <img src={noCheatMealIcon} alt='No cheat meal' className='dayIcon' />
        )}
        {oneGallonOfWater && (
          <img src={outdoorWorkoutIcon} alt='Outdoor workout' className='dayIcon' />
        )}
        {outdoorWorkout && (
          <img
            src={progressPictureIcon}
            alt='Progress picture'
            className='dayIcon'
          />
        )}
        {progressPicture && <img src={readIcon} alt='Read' className='dayIcon' />}
        {read && (
          <img src={waterGallonIcon} alt='Gallon of water' className='dayIcon' />
        )}

        {/* {!!dayData?.moneySpent && (
          <div className='calendarData'>{`$${dayData.moneySpent}`}</div>
        )} */}
      </div>
    </>
  )
}

CalendarData.propTypes = {
  date: PropTypes.number.isRequired,
  dayData: PropTypes.object,
  highlightDay: PropTypes.bool,
}
