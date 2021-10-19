import { types } from "../../types/types";

describe('Pruebas en types.js', () => {
    
    test('El objeto types debe ser tal cual como esta definido', () => {
        
        const typesTest = {
            login: '[Auth] login',
            logout: '[Auth] logout',
            loaderTrue: '[loader] True',
            loaderFalse: '[loader] False',
            notesAddNew: '[notes] addNew',
            notesActive: '[notes] active',
            notesResetActive: '[notes] reset active',
            notesSet: '[notes] setNotes',
            noteRefresh: '[notes] refresh',
            noteRemove: '[notes] remove',
            purgeNotes: '[notes] purge notes',
            purgeLoader: '[loader] purge loader'
        };

        expect(types).toEqual(typesTest);

    });

});