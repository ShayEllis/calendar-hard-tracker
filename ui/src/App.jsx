import { useReducer, useEffect, useState } from 'react'
import { Calendar } from './components/calendar/calendar'
import { Stats } from './components/stats/stats'
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
import { localStorageUtils } from './utils/localStorage'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { purple } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#4E6E58',
    },
  },
})

function App() {
  // Manages all calendar state
  const [state, dispatch] = useReducer(reducer, initialState)
  // Spinner displays when data is being fetched from the server
  const [fetchingData, setFetchingData] = useState(false)

  // Fetch exsisting data from the server
  useEffect(() => {
    if (
      localStorageUtils.checkSyncStatus() &&
      localStorageUtils.checkIfDataExpired()
    ) {
      dispatch({
        type: 'app/loadCalenderDayData',
        payload: localStorageUtils.getCachedData(),
      })
      // Render's free server goes to sleep, this will ping the server and wake it up for subsequent HTTP requests
      calendarServer.fetchCalendarDayData()
    } else {
      setFetchingData(true)

      calendarServer
        .fetchCalendarDayData()
        .then((response) => {
          if (response) {
            dispatch({ type: 'app/loadCalenderDayData', payload: response })
            localStorageUtils.setCachedData(response, true)
            setFetchingData(false)
          }
        })
        .catch((e) => {
          console.error(`Failed to update calendar state - ${e.message}`)
        })
    }
  }, [])

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        <ThemeProvider theme={theme}>
          {fetchingData && (
            <Backdrop
              sx={{
                color: '#AFB3F7',
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={true}>
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
          )}
          <div className='bodyContainer'>
            <Calendar />
            <Stats />
          </div>
        </ThemeProvider>
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  )
}

export default App
