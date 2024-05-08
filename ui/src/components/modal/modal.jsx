import { useRef, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import './modal.css'
import {
  CalendarContext,
  CalendarDispatchContext,
} from '../../context/calendarContexts'
import { calendarServer } from '../../utils/calendarServer'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { localStorageUtils } from '../../utils/localStorage'

const formControlLabelStyles = {
 marginRight: 0,
 marginTop: '.5rem'
}

export const Modal = ({ showConfetti }) => {
  // Main calendar state and dispatch function
  const state = useContext(CalendarContext)
  const dispatch = useContext(CalendarDispatchContext)

  // Reference to the modal, this will be used later to open and close it.
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

  // Open the modal if a day is currently selected
  useEffect(() => {
    if (state.selectedDay) showModal()
  })

  // Allow the modal to be closed when the enter key on the keyboard is pressed
  const handleKeyDown = ({ key }) => {
    if (key === 'Enter') closeModal()
  }
  // Allow the modal to be closed by clicking on the backdrop
  const handleBackdropClick = (event) => {
    if (event.target.id === 'modal') closeModal()
  }

  // Sends data to the server when the modal is closed
  const handleModalClose = () => {
    const inputValues = state.dayData[state.selectedDay]
    const allInputValuesFalse = Object.values(inputValues).every(
      (value) => value === false
    )

    if (state.exsistingDayData) {
      if (allInputValuesFalse) {
        localStorageUtils.deleteFromCachedData(state.dayData, state.selectedDay)

        calendarServer
          .deleteCalendarDayData(state.selectedDay)
          .then((response) => {
            if (response) localStorageUtils.setSyncStatusTrue()
          })

        dispatch({
          type: 'modal/deleteCalendarDayData',
          payload: state.selectedDay,
        })
      } else {
        localStorageUtils.updateCachedData(state.dayData)

        calendarServer
          .updateCalendarDayData(state.selectedDay, inputValues)
          .then((response) => {
            if (response) localStorageUtils.setSyncStatusTrue()
          })
      }
    } else {
      if (!allInputValuesFalse) {
        const dayData = {
          dateString: state.selectedDay,
          ...inputValues,
        }
        localStorageUtils.updateCachedData(state.dayData)

        calendarServer.createCalendarDayData(dayData).then((response) => {
          if (response) localStorageUtils.setSyncStatusTrue()
        })
      } else {
        dispatch({
          type: 'modal/deleteCalendarDayData',
          payload: state.selectedDay,
        })
      }
    }
    if (
      Object.values(state.dayData[state.selectedDay]).filter(
        (inputVal) => inputVal === true
      ).length === 7
    ) {
      showConfetti()
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
        onMouseDown={handleBackdropClick}
        ref={modalRef}>
        <Box >
          <FormGroup>
            <FormControlLabel
              label='Follow a diet'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='diet'
                  checked={state.dayData[state.selectedDay].diet}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='No alcohol or cheat meal'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='noAlcoholOrCheatMeal'
                  checked={
                    state.dayData[state.selectedDay].noAlcoholOrCheatMeal
                  }
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='45 min indoor workout'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='indoorWorkout'
                  checked={state.dayData[state.selectedDay].indoorWorkout}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='45 min outdoor workout'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='outdoorWorkout'
                  checked={state.dayData[state.selectedDay].outdoorWorkout}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='Drink one gallon of water'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='oneGallonOfWater'
                  checked={state.dayData[state.selectedDay].oneGallonOfWater}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='Progress picture'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='progressPicture'
                  checked={state.dayData[state.selectedDay].progressPicture}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
            <FormControlLabel
              label='Read ten pages'
              sx={formControlLabelStyles}
              control={
                <Checkbox
                  color='secondary'
                  name='read'
                  checked={state.dayData[state.selectedDay].read}
                  onChange={(event) =>
                    modalInputChange(event, state.selectedDay)
                  }
                />
              }
            />
          </FormGroup>
          <div>
            <Stack
              direction='row'
              pt={2}
              justifyContent='center'
              alignItems='center'
              spacing={2}
              color='secondary'>
              <Button
                color='secondary'
                variant='contained'
                disableElevation
                onClick={closeModal}>
                Save
              </Button>
              <Button
                color='secondary'
                variant='contained'
                disableElevation
                onClick={clearDayValues}>
                Clear
              </Button>
            </Stack>
          </div>
        </Box>
      </dialog>
    </div>
  )
}

Modal.proptypes = {
  showConfetti: PropTypes.func.isRequired,
}
