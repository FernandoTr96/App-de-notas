import React from 'react';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Loader } from '../loading/Loader';

/* validar formularios con el paquete : react-hooks-form
   https://react-hook-form.com/get-started
*/

// para instalar el manejador de firebase en mi app y poder hacer autenticacion
// npm install firebase


export const LoginScreen = () => {

    //paquete de validaciones
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();

    //console.log ( useForm() );

    //para hacer dispatch a mi reducer de la store se utiliza
    //el hook useDispatch de react-redux
    const dispatch = useDispatch();

    // useSelector de redux permite obtener el estado global
    // osea el conjunto de reducers
    const { loader: { loading } } = useSelector(state => state);

    const submit = () => {
        //valores del formulario
        const { email, password } = getValues();

        //dispatcch de la accion login
        dispatch(startLoginEmailPassword(email, password));
    };

    const handleGoogleSingIn = () => {
        dispatch(startGoogleLogin());
    }

    return (

        <form onSubmit={handleSubmit(submit)} className='auth__form animate__animated animate__fadeIn' autoComplete='off'>

            <legend>
                JournalApp
            </legend>

            <input
                type='text'
                placeholder='📧 example@gmail.com'
                defaultValue={watch('email')}
                {...register('email', { required: true, pattern: /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/i })}
            />
            {errors.email?.type === 'required' && <small className='error'>*This field is required</small>}
            {errors.email?.type === 'pattern' && <small className='error'>*The email does not have a valid structure</small>}

            <input
                type='password'
                placeholder='🔑 password'
                defaultValue={watch('password')}
                {...register('password', { required: true })}
            />
            {errors.password && <small className='error'>*This field is required</small>}

            <button type='submit' disabled={loading} >
                {loading && <Loader src='https://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg' />}
                Log-in
            </button>

            <div onClick={handleGoogleSingIn} className='auth__google-sign-in'>
                <p className='auth__google-legend'>Login with social network</p>
                <div className='auth__google-button'>
                    <div>
                        <img
                            src='https://freesvg.org/img/1534129544.png'
                            alt='google'
                        />
                    </div>
                    <p>
                        <b>Sign in with google</b>
                    </p>
                </div>
            </div>

            <Link to='/auth/register' className='auth__link'>
                Create new account
            </Link>

        </form>

    )
}
