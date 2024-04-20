import express from 'express'
import cors from 'cors'
import { calendarRouter } from './routes/calendarRouter.js'
import { healthRouter } from './routes/healthRouter.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use('/api/calendar', calendarRouter)
app.use('/health', healthRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
