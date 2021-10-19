import React from 'react'
import { Loader } from './Loader'

export const LoadingScreen = ({gif}) => {
    return (
        <div className='loading__loadingScreen'>
            <img className='loading__gif' src={gif} alt='gif' />
            <p>getting your session... wait !!</p>
            <Loader src = 'https://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg' /> 
        </div>
    )
}
