import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesResetActive:
            return {
                ...state,
                active: null
            }

        case types.notesSet:
            return {
                ...state,
                notes: [...action.payload]
            }

        case types.noteRefresh:
            return {
                ...state,
                notes: state.notes.map(note =>
                    note.id === action.payload.id ?
                        action.payload.data :
                        note
                )
            }

        case types.noteRemove:
            return {
                ...state,
                notes: state.notes.filter(note => note.id !== action.payload)
            }
        
        case types.purgeNotes:
            return{
                notes: [],
                active: null
            }

        default:
            return state;
    }
}