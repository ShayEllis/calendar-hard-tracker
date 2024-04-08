const apiURI = import.meta.env.VITE_API_URI

export const calendarServer = {
  async createCalendarDayData(data) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
    try {
      const response = await fetch(apiURI, options)
      if (!response.ok) throw new Error(await response.text())
    } catch (e) {
      console.error(e.message)
    }
  },
  async fetchCalendarDayData() {
    try {
      const response = await fetch(apiURI)
      if (!response.ok) throw new Error(await response.text())

      const calendarDayData = await response.json()
      return calendarDayData
    } catch (e) {
      console.error(e.message)
    }
  },
  async updateCalendarDayData(dateString, data) {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }

    try {
      const response = await fetch(`${apiURI}/${dateString}`, options)
      if (!response.ok) throw new Error(await response.text())
    } catch (e) {
      console.error(e.message)
    }
  },
  async deleteCalendarDayData(dateString) {
    const options = {
      method: 'DELETE',
    }

    try {
      const response = await fetch(`${apiURI}/${dateString}`, options)
      if (!response.ok) throw new Error(await response.text())
    } catch (e) {
      console.error(e.message)
    }
  },
}
