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
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function App() {
  // Manages all calendar state
  const [state, dispatch] = useReducer(reducer, initialState)
  // Spinner displays when data is being fetched from the server
  const [fetchingData, setFetchingData] = useState(true)

  useEffect(() => {
    calendarServer
      .fetchCalendarDayData()
      .then((response) => {
        if (response) {
          dispatch({ type: 'app/loadCalenderDayData', payload: response })
          setTimeout(() => setFetchingData(false), 7000)
        }
      })
      .catch((e) => {
        console.error(`Failed to update calendar state - ${e.message}`)
      })
  }, [])

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        {fetchingData &&
          <Backdrop
            sx={{
              color: '#AFB3F7',
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
            onClick={() => console.log('clicked')}>
            <CircularProgress color='inherit' size={85} thickness={2} />
            <Box
              sx={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Typography variant='caption' component='div' color='inherit'>
                Loading...
              </Typography>
            </Box>
          </Backdrop>
        }
        <div className='bodyContainer'>
          <Calendar />
        </div>
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  )
}

export default App
