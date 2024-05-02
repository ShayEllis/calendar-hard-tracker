import { useContext, useState } from 'react'
import { CalendarContext } from '../../context/calendarContexts'
import './stats.css'
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer'
import { BarChart } from '@mui/x-charts/BarChart'

export const Stats = () => {
  const state = useContext(CalendarContext)
  const [visible, setVisible] = useState(true)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'Nobember',
    'December',
  ]


  return (
    <div className='statsContainer'>
      <button onClick={() => setVisible(!visible)}>add/remove</button>
      {visible && <div className='testBox'></div>}
      <p>{JSON.stringify(state)}</p>
      <BarChart
        xAxis={[
          { data: months, scaleType: 'band', dataKey: 'test' },
        ]}
        series={[
          { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: 'aTest' },
          { data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], label: 'bTest' },
          { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: 'aTest' },
          { data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], label: 'bTest' },
          { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: 'aTest' },
          { data: [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], label: 'bTest' },
          { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: 'aTest' },
          
        ]}
        width={1000}
        height={300}
      />
    </div>
  )
}
