import Swal from "sweetalert2";
import { db, addDoc, collection, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from "../firebase/firebase-config";
import { uploadImg } from "../helpers/uploadImg";
import {removeImg} from '../helpers/removeImg'
import { types } from "../types/types";
import { finishLoader, startLoader } from "./loaderActions";

//insertar en firestore addDoc

/* PARA INSERTAR EN FIRESTORE DEBE ESTAR AUTENTICADO    
    allow read, write: if request.auth != null;
*/

export const startNewNote = () => {
    //getState: permite traer el estado global como un useSelector()
    //estos argumentos son pasados por el moddleware
    return async (dispatch, getState) => {

        //id del usuario que llamo la accion o esta en sesion
        const uid = getState().auth.uid;

        //objeto que contendra la info de la nota
        const newNote = {
            title: 'New note',
            body: '...',
            date: new Date().getTime()
        }

        //insertar en firestore
        try {

            dispatch(startLoader());

            const docRef = await addDoc(
                collection(db, `${uid}/journal/notes`),
                newNote
            );

            //activar nota
            dispatch(activeNote(docRef.id, newNote));

            //obtener las notas para actualizar el estado
            dispatch(getNotes(uid));

            dispatch(finishLoader());


        } catch (error) {

            console.log(error);
            Swal.fire({
                title: 'Not created',
                text: error,
                icon: 'error',
                confirmButtonText: 'ok'
            })

        }

    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const resetActiveNote = () => ({
    type: types.notesResetActive
})


//Leer datos de firestore getDocs

export const getNotes = (uid) => {
    return async (dispatch) => {

        let notes = [];

        try {

            const q = query(collection(db, `${uid}/journal/notes`), orderBy('date', 'desc'));
            const data = await getDocs(q);

            data.forEach((doc) => {
                notes.push(
                    {
                        id: doc.id,
                        ...doc.data()
                    }
                )
            })

            dispatch(setNotes(notes));

        } catch (error) {

            Swal.fire({
                title: 'I cant get the notes',
                text: error,
                icon: 'error',
                confirmButtonText: 'ok'
            })

        }

    }
}

export const setNotes = (notes) => (
    {
        type: types.notesSet,
        payload: notes
    }
);


//actualizar nota
export const updateNote = (note) => {
    return async (dispatch, getState) => {

        const { auth: { uid } } = getState();
        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        try {

            const docRef = doc(db, `${uid}/journal/notes`, note.id);
            await updateDoc(docRef, noteToFireStore);
            dispatch(activeNote(note.id, note));
            dispatch(refreshNote(note.id, note));

            Swal.fire({
                title: 'Note updated',
                text: 'The note has been updated successfully !!',
                icon: 'success',
                confirmButtonText: 'ok'
            })

        } catch (error) {

            Swal.fire({
                title: 'I cant update the note',
                text: error,
                icon: 'error',
                confirmButtonText: 'ok'
            })

        }
    }
}

const refreshNote = (id, data) => ({
    type: types.noteRefresh,
    payload: {
        id, data
    }
})


//subir imagen
export const uploadImage = (file) => {
    return async (dispatch, getState) => {

        dispatch(startLoader());

        const upload = await uploadImg(file);

        if (upload !== null) {

            const {url, public_id} = upload;

            const noteActive = getState().notes.active;
            const noteWithUrlToFirestore = {
                ...noteActive,
                public_id,
                url
            };

            if (getState().notes.active?.public_id) {
                const public_id = getState().notes.active.public_id;
                removeImg(public_id);
            }

            dispatch(activeNote(noteWithUrlToFirestore.id, noteWithUrlToFirestore));
            dispatch(updateNote(noteWithUrlToFirestore));

        }

        dispatch(finishLoader());

    }
}

//Eliminar nota

export const deleteNote = (id) => {
    return (dispatch, getState) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                dispatch(startLoader());

                try {

                    const uid = getState().auth.uid;
                    await deleteDoc(doc(db, `${uid}/journal/notes`, id));
                    dispatch(removeNote(id));

                    if (getState().notes.active?.public_id) {
                        const public_id = getState().notes.active.public_id;
                        removeImg(public_id);
                    }

                    Swal.fire(
                        'Deleted!',
                        'Your note has been deleted.',
                        'success'
                    )


                } catch (error) {

                    Swal.fire({
                        title: 'i cant delete the note',
                        text: error,
                        icon: 'error',
                        confirmButtonText: 'ok'
                    })

                }

                dispatch(finishLoader());

                dispatch(resetActiveNote());

            }
        })
    }
}

const removeNote = (id) => (
    {
        type: types.noteRemove,
        payload: id
    }
)

export const purgeNotes = () => (
    {
        type: types.purgeNotes
    }
)

/* ASI ENTIENDO NO SQL

//coleccion
uid = [
    //documento
    journal = {

        //coleccion
        notes = [

            //documento
            id = {

                //campos
                body: "",
                title: "",
                date: ""
            }
        ]
    }
]

[
    {
        journal: {
            notes:[
                01:{
                    body: "",
                    title: "",
                    date: ""
                }
            ]
        }
    }
]*/