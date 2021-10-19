import React from 'react';
import {mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'       
import { Provider } from 'react-redux';
import { Sidebar } from '../../../components/journal/Sidebar';
import { purgeNotes, startNewNote } from '../../../actions/notesActions';
import { startLogout } from '../../../actions/authActions';
import { purgeLoader } from '../../../actions/loaderActions';

const middlewares = [thunk];
const mockstore = configureStore(middlewares);
const init = {
    auth:{
        displayName: 'Fernando',
        photoURL: 'https://placeimg.com/100/100/any'
    },
    loader:{
        loading: false
    },
    notes:{
        notes: []
    }
};
const store = mockstore(init);
store.dispatch= jest.fn();

let wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <Sidebar/>
        </MemoryRouter>
    </Provider>
);


//mocks
jest.mock('../../../actions/notesActions', ()=>({
    startNewNote: jest.fn(),
    purgeNotes: jest.fn()
}))

jest.mock('../../../actions/loaderActions', ()=>({
    purgeLoader: jest.fn()
}))

jest.mock('../../../actions/authActions.js', ()=>({
    startLogout: jest.fn()
}))


describe('Pruebas en <Sidebar/>', () => {
    
    test('debe renderizar correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe mostrar el nombre de ususario ', () => {   
        const displayNameSnap = wrapper.find('.journal__displayName small').text().trim();
        expect(displayNameSnap).toBe(init.auth.displayName);
    });

    test('addNewNote debe lanzar la accion de una nueva nota ', () => {
        
        wrapper.find('.journal__btn-add-entry button').simulate('click')
        expect(startNewNote).toHaveBeenCalled();

    });

    test('logout debe cerrar sesion y purgar los estados', () => {
        
        wrapper.find('.journal__user button').simulate('click');
        expect(startLogout).toHaveBeenCalled();
        expect(purgeLoader).toHaveBeenCalled();
        expect(purgeNotes).toHaveBeenCalled();

    });

});