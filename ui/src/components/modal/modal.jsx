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
    const allowedInputNames = [
      'diet',
      'noAlcoholOrCheatMeal',
      'indoorWorkout',
      'outdoorWorkout',
      'oneGallonOfWater',
      'progressPicture',
      'read',
    ]
    // const capitalInputName = `${event.target.name[0].toUpperCase()}${event.target.name.slice(
    //   1
    // )}`
    if (allowedInputNames.includes(event.target.name)) {
      dispatch({
        type: `modal/changeInputValue`,
        payload: {
          dayIdentifier,
          inputName: event.target.name,
          value: !state.dayData[dayIdentifier][event.target.name],
        },
      })
    } else {
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
    const inputValues = state.dayData[state.selectedDay]
    const allInputValuesFalse = Object.values(inputValues).every((value) => value === false)

    if (state.exsistingDayData) {
      if (allInputValuesFalse) {
        calendarServer.deleteCalendarDayData(state.selectedDay)
        dispatch({
          type: 'modal/deleteCalendarDayData',
          payload: state.selectedDay,
        })
      } else {
        calendarServer.updateCalendarDayData(
          state.selectedDay,
          inputValues
        )
      }
    } else {
      if (!allInputValuesFalse) {
        const dayData = {
          dateString: state.selectedDay,
          ...inputValues,
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
