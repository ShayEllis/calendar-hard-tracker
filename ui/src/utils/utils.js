export const generateCalendarDays = (currentDate) => {
  // Create a Date object and set it to the first of the month
  const startOfCalendar = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  // If the month does not start on SUN, the start of the calendar, get the correct day number for the previous month
  if (startOfCalendar.getDay() > 0) {
    startOfCalendar.setDate(
      startOfCalendar.getDate() - startOfCalendar.getDay()
    )
  }
  // Map the max number of days in the calendar and create an array to build the calendar from
  return Array(42)
    .fill(null)
    .map(() => {
      const currentDay = new Date(startOfCalendar)
      startOfCalendar.setDate(startOfCalendar.getDate() + 1)
      return currentDay
    })
}

export const getDayIdentifier = (dayObj) => {
  return `${dayObj.getMonth()}${dayObj.getDate()}${dayObj.getFullYear()}`
}