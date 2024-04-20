import { calendarModel } from "../models/model.js"

export const getCalendarData = async (req, res) => {
  try {
    const calendarData = await calendarModel.findMany()
    return res.json(calendarData)
  } catch (e) {
    console.error(e.message)
    return res.status(400).send('Failed to retrieve day data.')
  }
}

export const createCalendarData = async (req, res) => {
  const data = req.body

  if (!data.dateString) {
    return res.status(400).send('Date string and background required.')
  }

  try {
    const note = await calendarModel.create({
      data,
    })
    return res.json(note)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send('Failed to add day data')
  }
}

export const updateCalendarData = async (req, res) => {
  const data = req.body
  const dateString = req.params.dateString

  try {
    const updateCalendarDay = await calendarModel.update({
      where: { dateString },
      data,
    })
    return res.json(updateCalendarDay)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send('Failed to update day data')
  }
}

export const deleteCalendarData = async (req, res) => {
  const dateString = req.params.dateString

  try {
    await calendarModel.delete({
      where: { dateString },
    })
    return res.status(204).send()
  } catch (e) {
    console.error(e.message)
    return res.status(500).send('Failed to delete from database')
  }
}
