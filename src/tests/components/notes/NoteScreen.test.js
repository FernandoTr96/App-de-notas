import React from 'react';
import {mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import {MemoryRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { NoteScreen } from '../../../components/notes/NoteScreen';

const middlewares = [thunk];
const mockstore = configureStore(middlewares);
const init = {
    loader:{
        loading: false
    },
    notes:{
        active:{
            title: 'TITLERANDOM',
            body: 'BODYRANDOM',
            date: 1634420927846
        }
    }
};
const store = mockstore(init);


const wrapper = mount(
    <Provider store = {store}>
        <MemoryRouter>
            <NoteScreen/>
        </MemoryRouter>
    </Provider>
);

describe('Pruebas en <NoteScreen/>', () => {
    
    test('debe pintarse correctamente', () => {
        expect(wrapper).toMatchSnapshot(); 
    });

    test('debe cambiar el valor de los input si la nota activa cambia', () => {
        
        expect(wrapper.find('input[type="text"]').prop('defaultValue')).toBe(init.notes.active.title);
        expect(wrapper.find('textarea').prop('defaultValue')).toBe(init.notes.active.body);
    
    });

    test('debe mostrar una imagen si es que tiene', () => {
        
        const storeWithImg = mockstore({
            ...init,
            notes:{
                active:{
                   ...init.notes.active,
                   url: 'https://placeimg.com/100/100/any'
                }
            }
        })

        const wrapper = mount(
            <Provider store={storeWithImg} >
                <MemoryRouter>
                    <NoteScreen/>
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.notes__image').exists()).toBe(true);

    });

});