import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import {auth} from '../firebase/firabase-Config'
import { useDispatch } from 'react-redux';
import { login } from "../actions/auth";
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
// import {firebase} from '../firebase/firabase-Config'

import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    
    const dispatch = useDispatch()

    const [checking, setchecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    //   firebase.auth().onAuthStateChanged((user)=> {
        
    //     if(user?.uid){
    //         dispatch(login(user.uid,user.displayName));
    //         setIsLoggedIn(true);
    //     }else{
    //         setIsLoggedIn(false);
    //     }

    //     setchecking(false)

    //    })

    
    onAuthStateChanged(auth, (user)=>{
        
         if(user?.uid){
            dispatch(login(user.uid,user.displayName));
            setIsLoggedIn(true);

          
           dispatch(startLoadingNotes(user.uid));
        }else{
            setIsLoggedIn(false);
        }

        setchecking(false)

    })
    }, [dispatch, setchecking, setIsLoggedIn])



    if(checking){
        return (
            <h1>Espere....</h1>
        )
        
    }



    return (
        <Router>
            <div>
            <Switch>
                <PublicRoute
                  path="/auth" 
                  component={AuthRouter}
                  isAuthenticated={isLoggedIn}
                >
                </PublicRoute>

                <PrivateRoute
                 exact path="/" 
                 component={JournalScreen}
                 isAuthenticated={isLoggedIn}
                >
                </PrivateRoute>
           <Redirect to='/auth/login' />
            </Switch>
            </div>
        </Router>
    )
}
