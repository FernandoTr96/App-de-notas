import React from 'react'
import {Link} from 'react-router-dom'
import {useForm} from "react-hook-form"
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from '../../actions/authActions';
import { Loader } from '../loading/Loader';


/* validar formularios con el paquete : react-hooks-form
   https://react-hook-form.com/get-started
*/

export const RegisterScreen = () => {

    //paquete de validaciones
    const {register, handleSubmit, reset, watch, getValues, formState: { errors }} = useForm();

    //console.log ( useForm() );

    const dispatch = useDispatch();

    const {loader:{loading}} = useSelector(state => state);

    const submit = ()=>{
        const {email,password,userName} = getValues();
        dispatch(registerUser(email,password,userName,reset));
    };
    

    return (
        <form onSubmit={handleSubmit(submit)} className='auth__form animate__animated animate__fadeIn' autoComplete='off'>

            <legend>
                Register
            </legend>

            <input
                type='email'
                placeholder='📧 example@gmail.com'
                defaultValue={watch('email')}
                { ...register( 'email' , {required:true, pattern: /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/i} ) }
            />
            {errors.email?.type==='required' && <small className='error'>*This field is required</small>}
            {errors.email?.type==='pattern' && <small className='error'>*The email does not have a valid structure</small>}

            <input
                type='text'
                placeholder='👤 username'
                defaultValue={watch('userName')}
                { ...register( 'userName' , {required:true} ) }
            />
            {errors.userName?.type==='required' && <small className='error'>*This field is required</small>}

            <input
                type='password'
                placeholder='🔑 password'
                defaultValue={watch('password')}
                { ...register( 'password' , {required:true, pattern: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/i} ) }
            />
            {errors.password?.type==='required' && <small className='error'>*This field is required</small>}
            {errors.password?.type==='pattern' && <small className='error'>*The password must have at least 8 to 16 characters, at least one digit, at least one lowercase and at least one uppercase</small>}

            <input
                type='password'
                placeholder='🔑 confirm password'
                defaultValue={watch('confirmPwd')}
                { ...register( 'confirmPwd' , {required:true} ) }
            />
            {errors.confirmPwd?.type==='required' && <small className='error'>*This field is required</small>}
            {watch('password') !== watch('confirmPwd') && <small className='error'>*Passwords do not match</small>}
            
            <button type='submit' disabled={loading}>
            {loading && <Loader src = 'https://samherbert.net/svg-loaders/svg-loaders/tail-spin.svg' /> } 
                Create account
            </button>

            <Link to='/auth/login' className='auth__link'>
                I have a account 
            </Link>

        </form>
    )
}
