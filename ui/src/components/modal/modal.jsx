import { useRef, useEffect, useContext } from 'react'
import './modal.css'
import {
  CalendarContext,
  CalendarDispatchContext,
} from '../../context/calendarContexts'
import { calendarServer } from '../../utils/calendarServer'

// This is a Modal wrapper component that will allow data to be entered on each calendar day
export const Modal = () => {
  const state = useContext(CalendarContext)
  const dispatch = useContext(CalendarDispatchContext)

  // Reference to the modal so that it can be opened and closed
  const modalRef = useRef(null)

  const showModal = () => {
    modalRef.current.showModal()
  }

  const closeModal = () => {
    modalRef.current.close()
  }

  const clearDayValues = () => {
    dispatch({ type: 'modal/clearDayValues', payload: state.selectedDay })
  }

  const modalInputChange = (event, dayIdentifier) => {
    switch (event.target.name) {
      case 'diet':
        dispatch({
          type: 'modal/changeDiet',
          payload: { dayIdentifier, value: !state.dayData[dayIdentifier].diet },
        })
        break
      case 'noAlcoholOrCheatMeal':
        dispatch({
          type: 'modal/noAlcoholOrCheatMeal',
          payload: { dayIdentifier, value: !state.dayData[dayIdentifier].noAlcoholOrCheatMeal },
        })
        break
      case 'indoorWorkout':
        dispatch({
          type: 'modal/indoorWorkout',
          payload: { dayIdentifier, value: !state.dayData[dayIdentifier].indoorWorkout },
        })
        break
      case 'outdoorWorkout':
        dispatch({
          type: 'modal/outdoorWorkout',
          payload: { dayIdentifier, value: !state.dayData[dayIdentifier].outdoorWorkout },
        })
        break
      case 'oneGallonOfWater':
        dispatch({
          type: 'modal/oneGallonOfWater',
          payload: { dayIdentifier, value: !state.dayData[dayIdentifier].oneGallonOfWater },
        })
        break
      case 'progressPicture':
        dispatch({
          type: 'modal/progressPicture',
          payload: { dayIdentifier, value: !state.dayData[dayIdentifier].progressPicture },
        })
        break
      case 'read':
        dispatch({
          type: 'modal/read',
          payload: { dayIdentifier, value: !state.dayData[dayIdentifier].read },
        })
        break
      default:
        console.error(`No input with the name '${event.target.name}'`)
    }
  }

  useEffect(() => {
    if (state.selectedDay) showModal()
  })

  // Allows the modal to be closed when the enter key on the keyboard is pressed
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') closeModal()
  }

  // Sends data to the server when the modal is closed
  const handleModalClose = () => {
    const { moneySpent, background } = state.dayData[state.selectedDay]

    if (state.exsistingDayData) {
      if (!moneySpent && !background) {
        calendarServer.deleteCalendarDayData(state.selectedDay)
        dispatch({
          type: 'modal/deleteCalendarDayData',
          payload: state.selectedDay,
        })
      } else {
        calendarServer.updateCalendarDayData(
          state.selectedDay,
          state.dayData[state.selectedDay]
        )
      }
    } else {
      if (!!moneySpent || background) {
        const dayData = {
          dateString: state.selectedDay,
          ...state.dayData[state.selectedDay],
        }
        calendarServer.createCalendarDayData(dayData)
      } else {
        dispatch({
          type: 'modal/deleteCalendarDayData',
          payload: state.selectedDay,
        })
      }
    }
    dispatch({ type: 'modal/removeSelectedDay' })
  }

  return (
    <div>
      <dialog
        id='modal'
        className='dialog'
        onKeyDown={handleKeyDown}
        onClose={handleModalClose}
        ref={modalRef}>
        <div className='inputContainer'>
          <label className='modalLabel'>
            Follow a Diet:
            <input
              type='checkbox'
              name='diet'
              className='modalInput'
              checked={state.dayData[state.selectedDay].diet}
              onChange={(event) => modalInputChange(event, state.selectedDay)}
            />
          </label>
          <label className='modalLabel'>
            No alcohol/cheat meal:
            <input
              type='checkbox'
              name='noAlcoholOrCheatMeal'
              className='modalInput'
              checked={state.dayData[state.selectedDay].noAlcoholOrCheatMeal}
              onChange={(event) => modalInputChange(event, state.selectedDay)}
            />
          </label>
          <label className='modalLabel'>
            45 min indoor workout:
            <input
              type='checkbox'
              name='indoorWorkout'
              className='modalInput'
              checked={state.dayData[state.selectedDay].indoorWorkout}
              onChange={(event) => modalInputChange(event, state.selectedDay)}
            />
          </label>
          <label className='modalLabel'>
            45 min outdoor workout:
            <input
              type='checkbox'
              name='outdoorWorkout'
              className='modalInput'
              checked={state.dayData[state.selectedDay].outdoorWorkout}
              onChange={(event) => modalInputChange(event, state.selectedDay)}
            />
          </label>
          <label className='modalLabel'>
            Drink 1 Gallon of water:
            <input
              type='checkbox'
              name='oneGallonOfWater'
              className='modalInput'
              checked={state.dayData[state.selectedDay].oneGallonOfWater}
              onChange={(event) => modalInputChange(event, state.selectedDay)}
            />
          </label>
          <label className='modalLabel'>
            Progress picture:
            <input
              type='checkbox'
              name='progressPicture'
              className='modalInput'
              checked={state.dayData[state.selectedDay].progressPicture}
              onChange={(event) => modalInputChange(event, state.selectedDay)}
            />
          </label>
          <label className='modalLabel'>
            Read ten pages:
            <input
              type='checkbox'
              name='read'
              className='modalInput'
              checked={state.dayData[state.selectedDay].read}
              onChange={(event) => modalInputChange(event, state.selectedDay)}
            />
          </label>
        </div>
        <button className='modalSaveBtn' onClick={closeModal}>
          Save
        </button>
        <button className='modalSaveBtn' onClick={clearDayValues}>
          Clear
        </button>
      </dialog>
    </div>
  )
}
