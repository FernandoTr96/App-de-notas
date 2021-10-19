import { types } from "../types/types";

export const loaderReducer = (state={},action)=> {
    switch (action.type) {
        
        case types.loaderTrue:         
        return {
            ...state,
            loading: action.payload.value
        }

        case types.loaderFalse:         
        return {
            ...state,
            loading: action.payload.value
        }

        case types.purgeLoader:
        return{}

    
        default:
        return state;
    }
}