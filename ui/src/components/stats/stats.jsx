import { useContext, useState, useMemo } from 'react'
import { CalendarContext } from '../../context/calendarContexts'
import './stats.css'
import { ProgressChart } from '../progressChart/progressChart'
import Button from '@mui/material/Button'
import { getCurrentStreak, getDayIdentifier } from '../../utils/utils'

export const Stats = () => {
  const state = useContext(CalendarContext)
  const [visible, setVisible] = useState(true)
  const goal = 75 // ****** MAKE EDITABLE? ******

  // ****** Would useMemo() help here? ******
  const completedDays = Object.keys(state.dayData).filter((dateString) => {
    if (dateString === getDayIdentifier(state.todaysDate)) return false
    const inputValues = Object.values(state.dayData[dateString])
    return inputValues.every((value) => value === true)
  })
  const currentStreak = completedDays.length //getCurrentStreak(completedDays, state.todaysDate) // ***** Doesnt work on mobile Safari *****

  return (
    <div className='statsContainer'>
      <Button
        color='secondary'
        variant='contained'
        disableElevation
        onClick={() => setVisible(!visible)}>
        hide/show
      </Button>
      {visible && <ProgressChart goal={goal} currentStreak={currentStreak} />}
    </div>
  )
}
