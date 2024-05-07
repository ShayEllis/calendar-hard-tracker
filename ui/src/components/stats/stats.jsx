import { useContext, useState, useMemo } from 'react'
import { CalendarContext } from '../../context/calendarContexts'
import './stats.css'
import { ProgressChart } from '../progressChart/progressChart'
import Button from '@mui/material/Button'
import { getCurrentStreak } from '../../utils/utils'

export const Stats = () => {
  const state = useContext(CalendarContext)
  const [visible, setVisible] = useState(false)
  const goal = 75 // ****** MAKE EDITABLE? ******

  const completedDays = Object.keys(state.dayData).filter((dateString) => {
    const inputValues = Object.values(state.dayData[dateString])
    return inputValues.every((value) => value === true)
  })
  console.log(completedDays)
  const currentStreak = getCurrentStreak(completedDays) // **** Need to fix - does not reset with breaks in data ****

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
