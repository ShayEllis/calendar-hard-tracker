import { createContext } from 'react'

// This context will be used for the main calendar state
export const CalendarContext = createContext(null)

// This contact will be used to hold the dispatch function for the main calendar state
export const CalendarDispatchContext = createContext(null)
