import { mount } from 'enzyme'
import React from 'react';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { LoginScreen } from '../../../components/auth/LoginScreen';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/authActions';
import { act } from 'react-dom/test-utils';

const middlewares = [thunk];
const mockstore = configureStore(middlewares);
const initState = {
    loader: {
        loading: false,
    }
};
let store = mockstore(initState);
store.dispatch = jest.fn();

//mock de funciones login
jest.mock('../../../actions/authActions', ()=>({
    startLoginEmailPassword: jest.fn(),
    startGoogleLogin: jest.fn()
}))

const wrapper = mount(
    <Provider store={store} >
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);


describe('Pruebas en <LoginScreen/>', () => {

    beforeEach(()=>{
        store = mockstore(initState);
        jest.clearAllMocks();
    })

    test('debe renderizarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('debe iniciar sesion con startLoginEmailPassword al hacer submit ', async () => {
        //act permite usar async & await para hacer cada renderizado del dom
        //uno por uno y que no truene
        await act( async ()=>{

            wrapper.find('input').at(0).simulate('change', {
                target: {
                    name: 'email',
                    value: 'test@gmail.com'
                }
            });
    
            wrapper.find('input').at(1).simulate('change', {
                target: {
                    name: 'password',
                    value: '54321halo'
                }
            });
    
            wrapper.find('.auth__form').simulate('submit');

        })

        expect(startLoginEmailPassword).toHaveBeenCalled();

    });

    test('el boton de google debe iniciar sesion con googleAuth', () => {
        
        wrapper.find('.auth__google-sign-in').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();

    });

    test('el link debe llevarte a la direccion de registro', () => {
        
        const href = wrapper.find('Link').prop('to');
        expect(href).toBe('/auth/register');

    });

});