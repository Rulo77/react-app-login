import { auth } from '../firebase/firabase-Config';
import { types } from '../types/types';
import {GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword, 
    signOut,
} from 'firebase/auth';
import { finishLoading, startLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

const provider= new GoogleAuthProvider();


export const starLoginEmailPassword = (email,password) =>{
    return (dispatch) =>{
        dispatch(startLoading());
        signInWithEmailAndPassword(auth,email,password)
        .then(({user})=>{
            
               dispatch( login(user.uid, user.displayName));
               dispatch(finishLoading())  })
           .catch(e=>{
            
            dispatch(finishLoading())
            Swal.fire('Error',e.message,'error')
        })
    }
}



export const startRegisterWithEmailPasswordName = (email,password,name) =>{
    return (dispatch) => {
        createUserWithEmailAndPassword(auth,email,password)
    
        .then( async ({user})=>{

           await updateProfile(user,{displayName:name});

            dispatch(
                login(user.uid, user.displayName)
            )
        })
        .catch(e=>{
         
            Swal.fire('Error',e.message,'error')
        })
    }
}


export const startGoogleLogin = () =>{
    return (dispatch) =>{
        signInWithPopup(auth,provider)
        .then(({user})=>{
            dispatch(
                login(user.uid, user.displayName)
            )
        });

    }
}


export const login = (uid,displayName) =>{
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
      await signOut(auth);


      dispatch(logout());
      dispatch(noteLogout());
    }
}

export const logout = () => ({
    type:types.logout
})