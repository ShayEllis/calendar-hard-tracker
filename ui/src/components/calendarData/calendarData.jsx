import PropTypes from 'prop-types'
import './calendarData.css'

export const CalendarData = ({ date, dayData }) => {
  return (
    <>
      <span className='calendarDate'>{date}</span>
      <div
        className='calendarDataContainer'
        style={
          dayData?.background ? { backgroundColor: '#5BBB60' } : undefined
        }>
        {!!dayData?.moneySpent && (
          <div className='calendarData'>{`$${dayData.moneySpent}`}</div>
        )}
      </div>
    </>
  )
}

CalendarData.propTypes = {
  date: PropTypes.number.isRequired,
  dayData: PropTypes.object,
  highlightDay: PropTypes.bool,
}
