import PropTypes from 'prop-types'
import './calendarData.css'
import { diet, indoorWorkout, noCheatMeal, outdoorWorkout, progressPicture, read, waterGallon } from '../../assets/icons'

export const CalendarData = ({ date, dayData }) => {
  return (
    <>
      <span className='calendarDate'>{date}</span>
      <div
        className='calendarDataContainer'
        style={
          dayData?.background ? { backgroundColor: '#5BBB60' } : undefined
        }>
          <img src={diet} alt='follow a diet' />
          <img src={indoorWorkout} alt='Indoor workout' />
          <img src={noCheatMeal} alt='No cheat meal' />
          <img src={outdoorWorkout} alt='Outdoor workout' />
          <img src={progressPicture} alt='Progress picture' />
          <img src={read} alt='Read' />
          <img src={waterGallon} alt='Gallon of water' />

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
