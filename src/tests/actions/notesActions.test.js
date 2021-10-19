/**
* @jest-environment node
*/

//LA INSTRUCCION DE ARRIBA ES PARA CAMBIAR EL ENTORNO DE JEST
//ASI PASARAN PRUEBAS QUE REQUIERAN NODE COMO LAS DE FIREBASE

//este paquete me permite mockear la store de redux
//esto esta en la documentacion https://github.com/reduxjs/redux-mock-store
import { deleteDoc, doc, getDoc } from '@firebase/firestore';
import configureStore from 'redux-mock-store'

//le pasamos el middleware que usamos en este caso thunk
import thunk from 'redux-thunk'
import { getNotes, startNewNote, updateNote, uploadImage } from '../../actions/notesActions';
import { db } from '../../firebase/firebase-config';
import { uploadImg } from '../../helpers/uploadImg';
import { types } from '../../types/types';
const middlewares = [thunk]
const mockStore = configureStore(middlewares)
//con la funcion del paquete unida al thunk podemos simular
//los datos de la store y obtenerlo tal cual como esta
const initState = {
    auth: {
        uid: 'TESTING'
    },
    notes:{
        active:{
            id: '3gvLRALy4DklcB4N9gFe',
            title: 'Nota actualizada desde jest',
            body: 'cuerpo actualizado',
            date: new Date().getTime()
        }
    }
};

let store = mockStore(initState);


//mock para la funcion que ya testeamos solo necesitamos una imagen}
//no necesitamos probar que suba a cloudinary
jest.mock('../../helpers/uploadImg', ()=>({
    uploadImg: jest.fn()
}))


describe('Pruebas en notesActions.js', () => {

    beforeEach(()=>{
        store = mockStore(initState);
    })

    test('startNewNote debe crear una nota nueva', async () => {

        //al probar funciones que modifiquen la db
        //es mejor tener una db solo para testing
        //store.dispatch(startNewNote());

        await store.dispatch(startNewNote())
 

        const actions = store.getActions();
        // //console.log(actions);

        expect(actions[0]).toEqual(
            {
                type: types.loaderTrue,
                payload: { value: true }
            }
        );

        expect(actions[1]).toEqual(
            {
                type: types.notesActive,
                payload: {
                    id: expect.any(String),
                    title: expect.any(String),
                    body: expect.any(String),
                    date: expect.any(Number)
                }
            }
        );

        expect(actions[2]).toEqual(
            {
                type: types.loaderFalse,
                payload: { value: false }
            }
        );
        
        const id = actions[1].payload.id;

        deleteDoc(doc(db, `TESTING/journal/notes`, id));

    });

    test('getNotes debe devolver las notas', async () => {
        
        await store.dispatch(getNotes('TESTING'));
        const actions = store.getActions();

        //console.log(actions);

        expect(actions[0]).toEqual(
            {
                type: types.notesSet,
                payload: expect.any(Array)
            }
        );

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect(actions[0].payload[0]).toMatchObject(expected);

    });

    test('updateNote debe actualizar la nota', async () => {

        const note = {
            id:'3gvLRALy4DklcB4N9gFe',
            title: 'Nota actualizada desde jest',
            body: 'cuerpo actualizado',
            date: new Date().getTime()
        }

        await store.dispatch(updateNote(note));

        const actions = store.getActions();

        expect(actions[0]).toEqual(
            {
                type: types.notesActive,
                payload: expect.any(Object)
            }
        );

        expect(actions[1]).toEqual(
            {
                type: types.noteRefresh,
                payload: expect.any(Object)
            }
        );

        const docRef = doc(db,`TESTING/journal/notes`, note.id);
        const docSnap = await getDoc(docRef);
        const docSaved = docSnap.data();

        delete note.id;
        delete docSaved.public_id;
        delete docSaved.url;

        expect(note).toEqual(docSaved);

    });

    test('uploadImage debe subir una imagen', async () => {

        const file = [];

        uploadImg.mockReturnValue({
            url: 'https://placeimg.com/100/100/any',
            public_id: 'test1234abc'
        });

        await store.dispatch(uploadImage(file));

    });

});