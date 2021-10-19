import { authReducer } from "../../Reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer.js', () => {
    
    test('debe hacer login ', () => {
        
        const initialState = {};

        const action = {
            type: types.login,
            payload: {
                uid: 'abc123uid',
                displayName: 'Fernando',
                photoURL: 'https://placeimg.com/100/100/any'
            }
        };

        const state = authReducer( initialState, action );

        expect(state).toEqual(action.payload);

    });

    test('debe hacer logout ', () => {
        
        const initialState = {
            uid: 'abc123uid',
            name: 'Fernando',
            photoURL: 'https://placeimg.com/100/100/any'
        };

        const action = {
            type: types.logout
        }

        const state = authReducer(initialState, action);

        expect(state).toEqual({});

    });

    test('debe regresar el mismo estado si la accion no existe', () => {
        
        const initialState = {
            uid: 'abc123uid',
            name: 'Fernando',
            photoURL: 'https://placeimg.com/100/100/any'
        };

        const action = {
            type: 'accion inexistente'
        }

        const state = authReducer(initialState, action);

        expect(state).toEqual(initialState);

    });
    
});