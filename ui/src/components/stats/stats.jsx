import { useContext, useState } from 'react'
import { CalendarContext } from '../../context/calendarContexts'
import './stats.css'
import { ProgressChart } from '../progressChart/progressChart'
import Button from '@mui/material/Button'

export const Stats = () => {
  const state = useContext(CalendarContext)
  const [visible, setVisible] = useState(false)
  const goal = 75 // ****** MAKE EDITABLE? ******
  const currentStreak = Object.keys(state.dayData).length // ****** detect gaps and only track most recent streak? ******

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
