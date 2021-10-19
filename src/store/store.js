//para crear la store es necesario utilizar el metodo createStore de redux
import {createStore,combineReducers, applyMiddleware, compose} from 'redux';
//middleware
import thunk from 'redux-thunk';
//reducers
import { authReducer } from '../Reducers/authReducer';
import { loaderReducer } from '../Reducers/loaderReducer';
import { notesReducer } from '../Reducers/notesReducer';

//combine reducer es para crear un objeto de puros reducer
const reducers = combineReducers({
    auth: authReducer,
    loader: loaderReducer,
    notes: notesReducer
});

//el createStore va recibir la variable con el combineReducers 
//asi guardaremos todos los reducer en la store

//en el github de la extension redux dev tools 
//indica que la store debe llevar el segundo parametro (middleware)
//para versse en el navegador y utilizarla extension
//window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//https://github.com/zalmoxisus/redux-devtools-extension#usage

//redux-thunk un middleware para hacer peticiones async con redux
//npm install --save redux-thunk

/* SI AÑADIMOS EL THUNK */
//middleware de react dev tools

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

