import React from 'react';
import {mount} from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { AppRouter } from '../../Routers/AppRouter';
import {act} from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router';
import { login } from '../../actions/authActions';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from '../../firebase/firebase-config';


const middlewares = [thunk];
const mockstore = configureStore(middlewares);
const init = {
    loader: {
        loading: false
    },
    notes:{
        notes: [],
        active:{
            uid:'abdc',
            date: new Date().getTime()
        }
    },
    auth:{
        uid: 'TESTING',
        displayName: 'Fernando96',
        photoURl: 'https://placeimg.com/100/100/any'
    }
};
const store = mockstore(init);
store.dispatch= jest.fn();

//mocks
jest.mock('../../actions/authActions', ()=>({
    login: jest.fn()
}))


describe('Pruebas en <AppRouter />', () => {

    test('debe llamar al login si estoy autenticado ', async () => {

        await act( async ()=>{

            await signInWithEmailAndPassword(auth,'test@gmail.com','54321halo');

            const wrapper = mount(
                <Provider store={store} >
                   <MemoryRouter>
                        <AppRouter/>
                   </MemoryRouter>
                </Provider>
            );

        })

        expect(login).toHaveBeenCalled();

    });
    
});