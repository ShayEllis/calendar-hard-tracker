import express from 'express'
import {
  getCalendarData,
  createCalendarData,
  updateCalendarData,
  deleteCalendarData,
} from '../controllers/calendarController.js'

const calendarRouter = express.Router()

// Return calendar data from database
calendarRouter.get('/', getCalendarData)
// Create new calendar data
calendarRouter.post('/', createCalendarData)
// update calendar data
calendarRouter.put('/:dateString', updateCalendarData)
// delete calendar data
calendarRouter.delete('/:dateString', deleteCalendarData)

export { calendarRouter }
