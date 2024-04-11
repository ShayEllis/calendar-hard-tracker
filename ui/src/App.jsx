import { useReducer, useEffect } from 'react'
import { Calendar } from './components/calendar/calendar'
import './App.css'
import { reducer, initialState } from './reducers/appReducer'
import {
  CalendarContext,
  CalendarDispatchContext,
} from './context/calendarContexts'
import { calendarServer } from './utils/calendarServer'

function App() {
  // Manages all calendar state
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    calendarServer
      .fetchCalendarDayData()
      .then((response) => {
        if (response)
          dispatch({ type: 'app/loadCalenderDayData', payload: response })
      })
      .catch((e) => {
        console.error(`Failed to update calendar state - ${e.message}`)
      })
  }, [])

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        <Calendar />
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  )
}

export default App
