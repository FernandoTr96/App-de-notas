import React from 'react';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {mount} from 'enzyme'
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import {act} from 'react-dom/test-utils'
import { registerUser } from '../../../actions/authActions';

const middlewares = [thunk];
const mockstore = configureStore(middlewares);
const initState = {
    loader: {
        loading: false
    }
};
const store = mockstore(initState);

//Actions must be plain objects. Use custom middleware for async actions. 
//saltamos el dispatch y lo tomaos como una funcion x
store.dispatch = jest.fn();

let wrapper = mount(
    <Provider store={store} >
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

//mock actions
jest.mock('../../../actions/authActions', () => ({
    registerUser: jest.fn()
}));



describe('Pruebas en <RegisterScreen/>', () => {

    beforeEach(()=>{
        wrapper = mount(
            <Provider store={store} >
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );
    })

    test('debe pintarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    });
    
    test('el submit debe disparar la accion de registro de ususario', async () => {
        
        await act( async ()=> {

            wrapper.find('input').at(0).simulate('change',{
                target: {
                    name: 'email',
                    value: 'test@gmail.com'
                }
            })

            wrapper.find('input').at(1).simulate('change',{
                target: {
                    name: 'userName',
                    value: 'Fernando96'
                }
            })

            wrapper.find('input').at(2).simulate('change',{
                target: {
                    name: 'password',
                    value: '54321haloO'
                }
            })

            wrapper.find('input').at(3).simulate('change',{
                target: {
                    name: 'confirmPwd',
                    value: '54321haloO'
                }
            })

            wrapper.find('.auth__form').simulate('submit');

        })

        expect(registerUser).toHaveBeenCalled();

    });


    test('los mensajes de error deben existir', async () => {
        
        await act( async ()=> {

            wrapper.find('input').at(0).simulate('change',{
                target: {
                    name: 'email',
                    value: 'emailerroneo.com'
                }
            })

            wrapper.find('input').at(2).simulate('change',{
                target: {
                    name: 'password',
                    value: '123erroneo'
                }
            })

            wrapper.find('.auth__form').simulate('submit');

        })
   
        expect(wrapper.html().includes('error')).toBe(true);

    });


    test('el link debe redireccionar a el login ', () => {
        
        const href = wrapper.find('Link').prop('to');
        expect(href).toBe('/auth/login')

    });

});