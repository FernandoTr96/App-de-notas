import React from 'react'
import { JournalEntry } from './JournalEntry';
import { useSelector } from 'react-redux'

export const JournalEntries = ({checkboxMenu}) => {

    const {notes:{notes}} = useSelector(state => state);

    return (
        <div className='journal__entries'>
            {
                notes.map(note => 
                    <JournalEntry 
                    key={note.id} 
                    {...note}
                    checkboxMenu={checkboxMenu}
                    />
                )
            }
        </div>
    )
}
