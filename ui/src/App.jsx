import { useReducer, useEffect, useState } from 'react'
import { Calendar } from './components/calendar/calendar'
import './App.css'
import { reducer, initialState } from './reducers/appReducer'
import {
  CalendarContext,
  CalendarDispatchContext,
} from './context/calendarContexts'
import { calendarServer } from './utils/calendarServer'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

function App() {
  // Manages all calendar state
  const [state, dispatch] = useReducer(reducer, initialState)
  const [fetchingData, setFetchingData] = useState(true)

  useEffect(() => {
    calendarServer
      .fetchCalendarDayData()
      .then((response) => {
        if (response)
          dispatch({ type: 'app/loadCalenderDayData', payload: response })
          setFetchingData(false)
          
      })
      .catch((e) => {
        console.error(`Failed to update calendar state - ${e.message}`)
      })
  }, [])

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        <Backdrop
          sx={{
            color: 'rgb(120, 85, 137)',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={fetchingData}
          onClick={() => console.log('clicked')}>
          <CircularProgress color='inherit' />
        </Backdrop>
        <Calendar />
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  )
}

export default App
