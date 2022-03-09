import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebase/firabase-Config";



export const loadNotes = async (uid) => {
   
    const notesSnap= await getDocs(collection(db,`${uid}/journal/notes`));

    const notes=[];

    //notesSnap.docs.map((doc)=>notes.push(doc.data()))
    notesSnap.docs.forEach(snapHijo =>{
       notes.push({
           id:snapHijo.id,
           ...snapHijo.data()
       })
    });

    return notes;
}