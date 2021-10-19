import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from 'react-hook-form'


export const NoteScreen = () => {

    const { notes: { active } } = useSelector(state => state);

    const { register, watch, setValue } = useForm();

    const noteListener = {
        title: watch('title'),
        body: watch('body')
    }

    //solo cambiar el value cuando cambie la nota activa
    useEffect(() => {
        setValue('title', active.title);
        setValue('body', active.body);
    
    }, [active, setValue])

    
    return (
        <div className='notes__main-content'>
            <NotesAppBar noteListener={noteListener} />
            <div className='notes__content'>

                <input
                    type='text'
                    placeholder='Title'
                    autoComplete='off'
                    {...register('title')}
                    defaultValue={watch('title')}
                />

                <textarea
                    placeholder='What happened today ?'
                    {...register('body')}
                    defaultValue={watch('body')}
                ></textarea>

                {
                    active?.url &&
                    <div className='notes__image'>
                        <img
                            src={active.url}
                            alt='journal'
                        />
                    </div>
                }

            </div>
        </div>
    )
}
