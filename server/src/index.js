import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient()
const port = 3000

app.use(express.json())
app.use(cors())

app.get('/api/calendar', async (req, res) => {
  try {
    const calendarData = await prisma.Calendar.findMany()
    return res.json(calendarData)
  } catch (e) {
    console.error(e.message)
    return res.status(400).send('Failed to retrieve day data.')
  }
})

app.post('/api/calendar', async (req, res) => {
  const { dateString, moneySpent, background } = req.body

  if (!dateString || typeof background !== 'boolean') {
    return res.status(400).send('Date string and background required.')
  }

  try {
    const note = await prisma.Calendar.create({
      data: { dateString, moneySpent, background },
    })
    return res.json(note)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send('Failed to add day data')
  }
})

app.put('/api/calendar/:dateString', async (req, res) => {
  const { moneySpent, background } = req.body
  const dateString = req.params.dateString

  if (typeof background !== 'boolean') {
    return res.status(400).send('Date string and background required.')
  }

  try {
    const updateCalendarDay = await prisma.Calendar.update({
      where: { dateString },
      data: { moneySpent: moneySpent, background },
    })
    return res.json(updateCalendarDay)
  } catch (e) {
    console.error(e.message)
    return res.status(500).send('Failed to update day data')
  }
})

app.delete('/api/calendar/:dateString', async (req, res) => {
  const dateString = req.params.dateString

  try {
    await prisma.Calendar.delete({
      where: { dateString },
    })
    return res.status(204).send()
  } catch (e) {
    console.error(e.message)
    return res.status(500).send('Failed to delete from database')
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
