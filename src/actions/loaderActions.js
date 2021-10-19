import { types } from "../types/types"

export const startLoader = ()=>{
    return {
        type: types.loaderTrue,
        payload:{
            value: true
        }
    }
}

export const finishLoader = ()=>{
    return {
        type: types.loaderFalse,
        payload:{
            value: false
        }
    }
}

export const purgeLoader = ()=>(
    {
        type: types.purgeLoader
    }
)