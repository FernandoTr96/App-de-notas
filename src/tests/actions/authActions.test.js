import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/authActions';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);


describe('Pruebas en authActions.js', () => {
    
    test('login y logout deben crear la accion respectiva ', () => {
        
        const data = {
            uid: 'TESTING',
            displayName: 'fernando',
            photoURL: 'https://placeimg.com/100/100/any'
        }

        const _login = login(
           data.uid,
           data.displayName,
           data.photoURL
        ); 

        const _logout = logout();


        expect(_login).toEqual({
            type: types.login,
            payload: data
        })

        expect(_logout).toEqual({
            type: types.logout
        });

    });

    test('startLoginEmailPassword debe realizar login y startLogout debe cerrar la sesion', async() => {
    
        await store.dispatch(startLoginEmailPassword(
            'test@gmail.com',
            '54321halo'
        ));

        await store.dispatch(startLogout());

        const actions = store.getActions();

        expect(actions[0]).toEqual(
            {
                type: types.loaderTrue,
                payload:{
                    value: true
                }
            }
        );

        expect(actions[1]).toEqual(
            {
                type: types.login,
                payload: {
                  uid: expect.any(String),
                  displayName: null,
                  photoURL: null
                }
            }
        );

        expect(actions[2]).toEqual(
            {
                type: types.loaderFalse,
                payload:{
                    value: false
                }
            }
        );

        expect(actions[3]).toEqual({
            type: types.logout
        });

    });

});