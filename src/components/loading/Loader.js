import React from 'react'
import PropTypes from 'prop-types';

export const Loader = ({src, w = 18 , h = 18}) => {
    return (
        <>
            <img className='loader' src={src} alt='loader' width={w} height={h} />
        </>
    )
}

Loader.propTypes = {
    src: PropTypes.string.isRequired
}

Loader.defaultProps = {
    src: 'https://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg'
}