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

export const convertServerData = (serverData) => {
  return serverData.reduce((acc, val) => {
    const valInputValues = { ...val }
    delete valInputValues.dateString
    acc[val.dateString] = valInputValues
    return acc
  }, {})
}

export const convertUiData = (uiData) => {
  return Object.keys(uiData).reduce((acc, val) => {
    const convertedDayData = { dateString: val, ...uiData[val] }
    return [...acc, convertedDayData]
  }, [])
}

export const getCurrentStreak = (completedDays, todaysDate) => {
  const convertDayStringToDate = (dateString) => {
    const month =
      parseInt(dateString.substring(0, 2)) <= 12
        ? dateString.substring(0, 2)
        : dateString.substring(0, 1)
    const year = dateString.substring(dateString.length - 4)
    const dayLength = dateString.length - month.length - year.length
    const day = dateString.substring(month.length, month.length + dayLength)
    return new Date(
      `${parseInt(month) + 1}, ${parseInt(day)}, ${parseInt(year)}`
    )
  }

  const sortedDayteStrings = completedDays.sort((a, b) => {
    const aDate = convertDayStringToDate(a)
    const bDate = convertDayStringToDate(b)

    if (aDate < bDate) {
      return 1
    } else {
      return -1
    }
  })

  const todaysDateCopy = new Date(
    convertDayStringToDate(getDayIdentifier(todaysDate))
  )
  let dayStreak = 0
  for (let i = 0; i < sortedDayteStrings.length - 1; i++) {
    const previousDay = todaysDateCopy
    previousDay.setDate(previousDay.getDate() - 1)

    if (
      convertDayStringToDate(sortedDayteStrings[i]).getTime() ===
      previousDay.getTime()
    ) {
      dayStreak += 1
    } else {
      break
    }
  }
  return dayStreak
}
