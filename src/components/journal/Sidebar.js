import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/authActions'
import { purgeNotes, startNewNote } from '../../actions/notesActions'
import { ButtonMenu } from './ButtonMenu'
import { JournalEntries } from './JournalEntries'
import { Loader } from '../loading/Loader'
import { purgeLoader } from '../../actions/loaderActions'

export const Sidebar = () => {

    // useSelector de redux permite obtener el estado global
    // osea el conjunto de reducers
    const { auth: { displayName, photoURL }, loader: { loading } } = useSelector(state => state);

    const dispatch = useDispatch();

    const checkboxMenu = useRef();

    const handleLogout = () => {
        dispatch(startLogout());
        dispatch(purgeLoader());
        dispatch(purgeNotes());
    }

    const handleAddNewEntry = () => {
        dispatch(startNewNote());
    }


    return (
        <>
            <input ref={checkboxMenu} type='checkbox' id='btnMenu' />
            <ButtonMenu />
            <aside className='journal__aside animate__animated animate__fadeIn'>
                <div className='journal__user'>
                    <div className='journal__displayName'>
                        <img className='journal__photo' src={photoURL} alt='photoURL' />
                        <small>
                            {displayName}
                        </small>
                    </div>
                    <button onClick={handleLogout} ><i className="fas fa-power-off"></i> Logout</button>
                </div>

                <div className='journal__btn-add-entry' title='add entry'>
                    {

                        loading ?
                        <Loader src='https://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg' w={25} h={25} /> :
                        <button onClick={handleAddNewEntry}>
                            <i className="far fa-calendar-plus"></i>
                            <small>Create entry</small>
                        </button>

                    }
                </div>

                <JournalEntries checkboxMenu={checkboxMenu} />
            </aside>
        </>
    )
}
