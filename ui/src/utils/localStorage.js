import { convertUiData } from './utils'

export const localStorageUtils = {
  checkSyncStatus() {
    return JSON.parse(localStorage.getItem('inSyncWithServer')) || false
  },
  setSyncStatusTrue() {
    localStorage.setItem('inSyncWithServer', 'true')
  },
  setSyncStatusFalse() {
    localStorage.setItem('inSyncWithServer', 'false')
  },
  setCachedData(data, boolean) {
    localStorage.setItem('cachedCalendarData', JSON.stringify(data))
    if (boolean) this.setDataExpireTime()
    boolean ? this.setSyncStatusTrue() : this.setSyncStatusFalse()
  },
  setDataExpireTime() {
    const timeBeforeExpired = 1000 * 60 * 60 * 6 // 6 hours
    localStorage.setItem(
      'cashedDataExpires',
      JSON.stringify(Date.now() + timeBeforeExpired)
    )
  },
  checkIfDataExpired() {
    const timeNow = Date.now()
    const storedTime = JSON.parse(localStorage.getItem('cashedDataExpires'))
    let result
    if (storedTime && storedTime > timeNow) {
      result = true
    } else {
      result = false
    }
    return result
  },
  getCachedData() {
    let result = false
    if (this.checkSyncStatus()) {
      result = JSON.parse(localStorage.getItem('cachedCalendarData'))
    }
    return result
  },
  updateCachedData(uiDayData) {
    let convertedData = convertUiData(uiDayData)
    this.setCachedData(convertedData, false)
  },
  deleteFromCachedData(dayData, dayToDelete) {
    let dayDataCopy = { ...dayData }
    delete dayDataCopy[dayToDelete]
    this.setCachedData(convertUiData(dayDataCopy), false)
  },
}
