import { useRef, useEffect, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { Chart } from 'chart.js/auto'
import './progressChart.css'

export const ProgressChart = ({ goal, currentStreak }) => {
  const canvasRef = useRef()
  const chartRef = useRef()

  const chartData = [currentStreak, goal - currentStreak]
  const chartLables = [
    `${chartData[0]} - Complete`,
    `${chartData[1]} - Remaining`,
  ]

  const data = {
    labels: chartLables,
    datasets: [
      {
        label: 'Days',
        data: chartData,
        backgroundColor: ['rgba(139, 95, 191, 0.4)', 'rgba(81, 79, 89, 0.4)'],
        borderColor: ['rgb(139, 95, 191)', 'rgb(81, 79, 89)'],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  }

  const renderChart = () => {
    chartRef.current = new Chart(canvasRef.current, {
      data: data,
      type: 'doughnut',
      options: {
        layout: {
          padding: {
            bottom: 20,
          },
        },
        // plugins: {
        //   legend: {
        //     labels: (a, b) => {
        //       console.log(a)
        //       console.log(b)
        //     },
        //   },
        // },
      },
    })
  }

  const destroyChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy()
      chartRef.current = null
    }
  }

  useLayoutEffect(() => {
    renderChart()

    return () => {
      destroyChart()
    }
  }, [])

  useEffect(() => {
    chartRef.current.data.labels = chartLables
    chartRef.current.data.datasets[0].data = chartData
    chartRef.current.update()
  }, [goal, currentStreak])

  return (
    <div className='progressChartContainer'>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

ProgressChart.propTypes = {
  goal: PropTypes.number.isRequired,
  currentStreak: PropTypes.number.isRequired,
}
