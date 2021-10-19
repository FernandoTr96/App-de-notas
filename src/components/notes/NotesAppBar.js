import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DateTime } from 'luxon'
import { updateNote,uploadImage, deleteNote } from '../../actions/notesActions';
import {Loader} from '../loading/Loader'

export const NotesAppBar = ({noteListener}) => {

    const dispatch = useDispatch();
    const { notes: { active }, loader: {loading} } = useSelector(state => state);


    //fecha 
    const config = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = DateTime.fromMillis(active.date).setLocale('mx').toLocaleString(config);


    const handleSave = () => {
        dispatch(
            updateNote(
                {
                    id:active.id,
                    ...noteListener,
                    date: active.date,
                    public_id: active.public_id,
                    url: active.url
                }
            )
        );
    }

    const handleImage = (e)=>{
        let file = e.target.files[0];
        dispatch(uploadImage(file));
    }

    const handleDelete = ()=>{
        dispatch(deleteNote(active.id));
    }

    return (
        <div className='notes__appbar'>
            {active && <span><i className="fas fa-calendar-day"></i> {date} </span>}
            <div>

                <input 
                id='file'
                type='file' 
                className='none'
                accept='*/img'
                onChange={handleImage}
                />

                {loading && <Loader src='https://samherbert.net/svg-loaders/svg-loaders/three-dots.svg' w = {10} h = {10} />}
                <button className='btn-picture'>
                   <label htmlFor='file'>
                        <i className="far fa-images"></i> picture
                   </label>
                </button>

                <button onClick={handleSave} className='btn-save'>
                    <i className="fas fa-save"></i> save
                </button>

                <button onClick={handleDelete}  className='btn-delete'>
                    <i className="fas fa-trash-alt"></i> delete
                </button>

            </div>
        </div>
    )
}
