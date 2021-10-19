import { onAuthStateChanged } from '@firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { HashRouter as Router, Switch, Redirect } from 'react-router-dom'
import { login } from '../actions/authActions'
import { getNotes } from '../actions/notesActions'
import { JournalScreen } from '../components/journal/JournalScreen'
import { LoadingScreen } from '../components/loading/LoadingScreen'
import { auth } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

    const dispatch = useDispatch();

    //estado para saber si esta autenticado
    const [checking, setChecking] = useState(true);
    const [isAuth, setisAuth] = useState(false);

    //observer de firebase
    //obtiene los datos de la ultima autenticacion realizada
    //lo hacemos en el router porque asi estara presente en toda la app
    //y detectara los cambios de la sesion en cada pantalla

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {

            if (user?.uid) {
                dispatch(
                    login(
                        user.uid,
                        user.displayName,
                        user.photoURL
                    )
                );
                setisAuth(true);
                dispatch(getNotes(user.uid));
            }
            else {
                setisAuth(false);
            }

            setChecking(false);

        })

    }, [dispatch, setChecking, setisAuth])

    //mostrar pantalla de espera mientras se comprueba si hay un uid de usuario
    //comprobar si hubo un logueo
    if (checking) {
        return (
            <LoadingScreen
                gif='https://i.pinimg.com/originals/df/0d/fd/df0dfd0cbde946eface1b152f3e62625.gif'
            />
        )
    }

    return (

        <Router>
            <>
                <Switch>
                    <PrivateRoute exact path='/' isAuth={isAuth} component={JournalScreen} />
                    <PublicRoute path='/auth' isAuth={isAuth} component={AuthRouter} />
                    <Redirect to='/auth/login' />
                </Switch>
            </>
        </Router>

    )
}
