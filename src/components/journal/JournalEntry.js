import React from 'react'
import {useDispatch} from 'react-redux'
import { activeNote } from '../../actions/notesActions';


export const JournalEntry = ({id,title,body,date,url,checkboxMenu}) => {

   const dispatch = useDispatch();
   const dateFormat = new Date(date).toLocaleDateString();

    const handleActiveNote = ()=>{
        
        dispatch(activeNote(id,{
           title,
           body,
           date,
           url
        }));

        //cerrar el menu usando la referencia si esta en movil
        checkboxMenu.current.checked = false;
    }


    return (
        <div onClick={handleActiveNote} className='journal__entry animate__animated animate__bounceInDown'>           
            {
                url ?
                <div className='journal__picture' style={{backgroundImage: `url(${url})` }}></div> :
                <div className='journal__picture' style={{backgroundImage:'url(https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640)'}}></div>
            }
            <div className='journal__body'>
                <div className='journal__title'>
                    <h4>{title}</h4>
                </div>
                <div className='journal__desc'>
                    <small>{body}</small>
                </div>
            </div>
            <div className='journal__date'>
                <small>{ dateFormat }</small>
            </div>
        </div>
    )
}
