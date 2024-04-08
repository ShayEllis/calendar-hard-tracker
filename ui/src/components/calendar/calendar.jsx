import { useContext } from 'react'
import Arrow from '../../assets/arrow.png'
import './calendar.css'
import { generateCalendarDays } from '../../utils/utils'
import { CalendarWeek } from '../calendarWeek/calendarWeek'
import { Modal } from '../modal/modal'
import {
  CalendarContext,
  CalendarDispatchContext,
} from '../../context/calendarContexts'

export const Calendar = () => {
  const state = useContext(CalendarContext)
  const dispatch = useContext(CalendarDispatchContext)
  // Array of days and months that will be used to generate the calendar.
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ]
  // Calculate the number of weeks to show in the calendar
  const weeksInCurrentMonth = Math.ceil(
    (new Date(
      state.calendarMonth.getFullYear(),
      state.calendarMonth.getMonth() + 1,
      0
    ).getDate() +
      new Date(
        state.calendarMonth.getFullYear(),
        state.calendarMonth.getMonth(),
        1
      ).getDay()) /
      7
  )
  // Use utils function to generate the days in the calender
  const days = generateCalendarDays(state.calendarMonth)

  const handlePreviousArrowClick = () => {
    dispatch({ type: 'calendar/previousMonth' })
  }

  const handleNextArrowClick = () => {
    dispatch({ type: 'calendar/nextMonth' })
  }

  return (
    <table id='calendar'>
      <thead>
        <tr>
          <th colSpan={7}>
            {state.selectedDay && (
              <Modal
                selectedDay={state.selectedDay}
                dayData={state.dayData ? state.dayData : undefined}
              />
            )}
            <div className='headingContainer'>
              <div className='arrowContainer'>
                <img
                  src={Arrow}
                  alt='Previous Month'
                  className='arrow previousArrow'
                  onClick={handlePreviousArrowClick}
                />
              </div>

              <h2 className='calendarHeading'>
                {`${
                  months[state.calendarMonth.getMonth()]
                } ${state.calendarMonth.getFullYear()}`}
              </h2>
              <div className='arrowContainer'>
                <img
                  src={Arrow}
                  alt='Next Month'
                  className='arrow nextArrow'
                  onClick={handleNextArrowClick}
                />
              </div>
            </div>
          </th>
        </tr>
        <tr>
          {weekDays.map((day) => (
            <th key={day}>
              <div className={`dayHeading ${day}`}>{day}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array(weeksInCurrentMonth)
          .fill(null)
          .map((week, idx) => (
            <CalendarWeek
              key={`${state.calendarMonth.getMonth()}${state.calendarMonth.getFullYear()}${idx}`}
              days={days}
              week={idx}
            />
          ))}
      </tbody>
    </table>
  )
}
