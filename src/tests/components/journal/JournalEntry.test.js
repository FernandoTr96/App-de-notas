import React from 'react';
import {mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'       
import { Provider } from 'react-redux';
import {JournalEntry} from '../../../components/journal/JournalEntry'
import { activeNote } from '../../../actions/notesActions';

const middlewares = [thunk];
const mockstore = configureStore(middlewares);
const init = {};
const store = mockstore(init);
store.dispatch= jest.fn();

const data = {
    id: 'abcsdfg123',
    title: 'tiutlo',
    body: 'body',
    date: new Date().getTime(),
    url: 'https://placimg.com/200/200/any',
    checkboxMenu: {
        current: {
            checked: true
        }
    }
};

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <JournalEntry {...data} />
        </MemoryRouter>
    </Provider>
);

//mocks
jest.mock('../../../actions/notesActions', ()=>({
    activeNote: jest.fn()
}))


describe('Pruebas en <JournalEntry/>', () => {

    test('debe renderizar correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe disparar la accion activeNote al dar click sobre la entrada', () => {
        wrapper.find('.journal__entry').prop('onClick')();
        expect(activeNote).toHaveBeenCalled();
    });

});