import React, {useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux'
import { useSelector} from 'react-redux'
import { activeNota, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const {active:note} = useSelector(state => state.notes)
    const [formValue,handleInputChange,reset]= useForm(note);

    const {body,title,id} = formValue;
   
     const activeId = useRef(note.id);

    

    useEffect(() => {
        if(note.id !== activeId.current){
            reset(note);
            activeId.current=note.id;
        }
       
    }, [note,reset])

    useEffect(() => {
        dispatch(activeNota(formValue.id,{...formValue}))
      
    }, [formValue, dispatch]);

    const handleDelete = () =>{
        dispatch(startDeleting(id));
    }

    return (
        <div className='notes__main-content'>

            <NotesAppBar />

            <div className='notes__content'>

                    <input 
                    type='text'
                    placeholder='some awesome title'
                    className='notes__title-input'
                    name='title'
                    value={title}
                    onChange={handleInputChange}
                   
                    />

                    <textarea 
                    placeholder='what happend today'
                    className='notes__textarea'
                    name='body'
                    value={body}
                    onChange={handleInputChange}
                  
                    >
                         </textarea>
                    
                    
                   { 
                   
                   (note.url)
                   &&
                   <div className='notes__image'>
                        <img 
                        src={note.url}
                         alt="paisaje"
                       
                          />
                    </div>}
                

            </div>
            <button 
            className='btn btn-danger'
            onClick={handleDelete}
            >
                Delete
            </button>
            
        </div>
    )
}
