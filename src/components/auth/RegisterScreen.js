import React from 'react';
import {Link} from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const {msgError}= useSelector(state =>state.ui);


    const [formValues, handleInputChange] = useForm({
        name: '',
        apellidoP:'',
        apellidoM:'',
        tel:'',
        direccion:'',
        email: '',
        password: '',
        password2: ''
    });

    const {name,apellidoP,apellidoM,tel,direccion,email,password,password2} = formValues; 

    const handleRegister= (e)=>{
        e.preventDefault();
        if(isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email,password,name));
        }

    }
    
    const isFormValid = () =>{
        if(name.trim().length === 0){
            dispatch(setError('name es requerido'));
            console.log('name es requerido');
            
            return false;
        }
        if(apellidoP.trim().length === 0){
            dispatch(setError('apellido paterno es requerido'));
            console.log('apellido paterno es requerido');
            
            return false;
        }
        if(apellidoM.trim().length === 0){
            dispatch(setError('apellido materno es requerido'));
            console.log('apellido materno es requerido');
            
            return false;
        }
        if(tel.trim().length < 10 ){
            dispatch(setError('telefono no valido'));
            console.log('telefono es requerido');
            
            return false;
        }
        if(direccion.trim().length === 0){
            dispatch(setError('direccion es requerido'));
            console.log('direccion es requerido');
            
            return false;
        }
        if(!validator.isEmail(email)){
            dispatch(setError('email invalido'));
            console.log('email invalido');
            return false
        }
        if(password!==password2 || password.length < 8 || !password.match(/[A-z]/) || !password.match(/[A-Z]/) || !password.match(/\d/) ){
            dispatch(setError('password debe contener minimo 8 caracteres entre letras mayusculas, minusculas, numeros y algun caracter especial y ser igual'));
            console.log('password debe contener minimo 8 caracteres y ser igual');
            return false
        }
         else{
             dispatch(removeError());
             return true;

         }
    }



    return (
        <>
        <h3 className='auth_title'>Register</h3>

        <form onSubmit={handleRegister}>

            {
              msgError &&
              (
                <div className='auth__alert-error'>
               {msgError}
                </div>
              )
            }



            <input 
            type='text'
             placeholder='Name' 
             name='name'
             className='auth__input'
             autoComplete='off'
             value={name}
             onChange={handleInputChange}
            //  required
             />
                <input 
            type='text'
             placeholder='Apellido Paterno' 
             name='apellidoP'
             className='auth__input'
             autoComplete='off'
             value={apellidoP}
             onChange={handleInputChange}
            // required
             />
                <input 
            type='text'
             placeholder='Apellido Materno' 
             name='apellidoM'
             className='auth__input'
             autoComplete='off'
             value={apellidoM}
             onChange={handleInputChange}
            // required
             />
                <input 
            type='number'
             placeholder='Telefono' 
             name='tel'
             className='auth__input'
             autoComplete='off'
             value={tel}
             onChange={handleInputChange}
           //  required
             />
                <input 
            type='text'
             placeholder='Direccion' 
             name='direccion'
             className='auth__input'
             autoComplete='off'
             value={direccion}
             onChange={handleInputChange}
            // required
             />
            <input 
            type='text'
             placeholder='email' 
             name='email'
             className='auth__input'
             autoComplete='off'
             value={email}
             onChange={handleInputChange}
           //  required
             />
            <input
             type='password'
             placeholder='Password'
              name='password'
              className='auth__input'
              value={password}
              onChange={handleInputChange}
            //  required
              />
                <input
             type='password'
             placeholder='Confirma tu Password'
              name='password2'
              className='auth__input'
              value={password2}
              onChange={handleInputChange}
            //  required
              />

            <button 
            type='submit'
            className='btn btn-primary btn-block mb-5'
            >
                Register
            </button>

            <Link 
            to='/auth/login'
            className='link'
            >
                Already registered?
            </Link>

        </form>
    </>
    )
}
