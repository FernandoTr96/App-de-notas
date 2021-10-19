import { finishLoader, purgeLoader, startLoader } from "../../actions/loaderActions";
import { types } from "../../types/types";

describe('Pruebas en loaderActions.js', () => {

    test('debe iniciar el loader en true ', () => {

        const start = startLoader();
        const returnExpected = {
            type: types.loaderTrue,
            payload: {
                value: true
            }
        }

        expect(start).toEqual(returnExpected);

    });

    
    test('debe finalizar el loader en false ', () => {

        const finish = finishLoader();
        const returnExpected = {
            type: types.loaderFalse,
            payload: {
                value: false
            }
        }

        expect(finish).toEqual(returnExpected);

    });

    test('debe purgar ele stado del loader', () => {
        
        const purge = purgeLoader();
        const returnExpected = {
            type: types.purgeLoader
        };

        expect(purge).toEqual(returnExpected);

    });

});