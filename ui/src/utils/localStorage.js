import { convertUiData } from './utils'

export const localStorageUtils = {
  checkSyncStatus() {
    return JSON.parse(localStorage.getItem('inSyncWithServer')) || false
  },
  setSyncStatusFalse() {
    localStorage.setItem('inSyncWithServer', 'false')
  },
  setSyncStatusTrue() {
    localStorage.setItem('inSyncWithServer', 'true')
  },
  setCachedData(data, boolean) {
    localStorage.setItem('cachedCalendarData', JSON.stringify(data))
    boolean ? this.setSyncStatusTrue() : this.setSyncStatusFalse()
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
