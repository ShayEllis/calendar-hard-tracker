import { useContext, useState, useMemo, useEffect, useRef } from 'react'
import { CalendarContext } from '../../context/calendarContexts'
import './stats.css'
import { ProgressChart } from '../progressChart/progressChart'
import Button from '@mui/material/Button'
import { getCurrentStreak, getDayIdentifier } from '../../utils/utils'
import { hide } from '@popperjs/core'

export const Stats = () => {
  const state = useContext(CalendarContext)
  const [hideChart, setHideChart] = useState(false)
  const goal = 75 // ****** MAKE EDITABLE? ******

  // ****** Would useMemo() help here? ******
  const completedDays = Object.keys(state.dayData).filter((dateString) => {
    if (dateString === getDayIdentifier(state.todaysDate)) return false
    const inputValues = Object.values(state.dayData[dateString])
    return inputValues.every((value) => value === true)
  })
  const currentStreak = getCurrentStreak(completedDays, state.todaysDate)

  const [chartHeight, setChartHeight] = useState()
  const chartContainerRef = useRef()

  useEffect(() => {
    const handleStatsResize = () => {
      setChartHeight(chartContainerRef.current.getBoundingClientRect().height)
    }
    handleStatsResize()
    window.addEventListener('resize', handleStatsResize)

    return () => window.removeEventListener('resize', handleStatsResize)
  }, [])

  return (
    <div className='statsContainer'>
      <Button
        color='secondary'
        variant='contained'
        disableElevation
        onClick={() => setHideChart(!hideChart)}>
        {hideChart ? '+': '-'}
      </Button>
      <div
        ref={chartContainerRef}
        className='chartContainer'
        style={
          hideChart
            ? {transform: 'scale(0)', marginBottom: `-${chartHeight}px`}
            : undefined
        }>
        <ProgressChart goal={goal} currentStreak={currentStreak} />
      </div>
    </div>
  )
}
