import { 
    auth,
    signInWithPopup,
    googleAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut
} from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoader, startLoader } from "./loaderActions";
import Swal from 'sweetalert2';


export const startLoginEmailPassword = (email,password) =>{
    return async (dispatch)=>{

        await dispatch(startLoader());
        
        await signInWithEmailAndPassword(auth,email,password)
        .then((userCred) =>{

            const  {user:{uid,displayName,photoURL}} = userCred;
            dispatch(login(uid,displayName,photoURL));

        })
        .catch(err =>{
            console.log(err);
            Swal.fire({
                title: 'Error!',
                text: err,
                icon: 'error',
                confirmButtonText: 'ok'
            })
        })

        await dispatch(finishLoader());
    }
};

export const startGoogleLogin = () =>{
    return (dispatch)=>{
        signInWithPopup(auth,googleAuthProvider)
        .then( userCred =>{
            //console.log(userCred);
            const  {user:{uid,displayName,photoURL}} = userCred;
            dispatch(login(uid,displayName,photoURL));
        })
    }
};

export const login = (uid,displayName,photoURL='https://placeimg.com/100/100/animals') => (
    {
        type: types.login,
        payload:{
            uid,
            displayName,
            photoURL
        }
    }
);

export const registerUser = (email,password,userName,reset)=>{
    return async (dispatch)=>{
        
        await dispatch(startLoader());

        //crear usuario en firebase
        await createUserWithEmailAndPassword(auth,email,password)
        .then( async ({user}) => {
            
            //funcion defirebase al obtener el usuario
            //permite registrar el nombre y la foto
            await updateProfile(auth.currentUser,{
                displayName: userName,
                photoURL: 'https://placeimg.com/100/100/any'
            });

            //actualizar el estado global
            const  {uid,displayName,photoURL} = user;
            dispatch(login(uid,displayName,photoURL));

            //reset form
            reset();

        })
        .catch(err =>{
            Swal.fire({
                title: 'Error!',
                text: err,
                icon: 'error',
                confirmButtonText: 'ok'
            })
        })

        await dispatch(finishLoader());
        
    }
};

export const startLogout = ()=>{
    return async (dispatch) =>{
        await signOut(auth);
        dispatch(logout());
    }
}

export const logout = ()=>(
    {
        type: types.logout
    }
)
