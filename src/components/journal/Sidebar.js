import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';
import { startNewNotes } from '../../actions/notes';
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const {name} = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const handleLogout= () =>{
       dispatch(startLogout())

    }

     const handleAddNew= () =>{
         dispatch(startNewNotes());
     }

    return (
        <aside className='journal_sidebar'>
         <div className='journal_sidebar-navbar'>
             <h3 className='mt-5'>
                 <i className='far fa-moon'></i>
                 <span>{name}</span>
             </h3>

             <button 
             className='btn'
             onClick={handleLogout}
             >
                 Logout
             </button>

         </div>

         <div 
         className='journal__new-entry'
         onClick={handleAddNew}
         >
             <i className='far fa-calendar-plus fa-5x'></i>
             <p className='mt-5'>
                 New entry
             </p>

         </div>

         <JournalEntries />
        </aside>
    )
}
