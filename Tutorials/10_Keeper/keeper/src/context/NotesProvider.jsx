import React, {createContext, useContext, useState} from "react";
import data from "../data/notes";

const NotesContext = createContext();

function NotesProvider({children}){
    const [notes, setNotes] = useState([...data]);

    function updateNotes(newNote){
        setNotes(prevNotes =>{
            return [...prevNotes, newNote]
        });
    }

    function deleteNote(title) {
        setNotes((prevNotes) => {
            return prevNotes.filter(note => note.title !== title);
        });
    }

    return(
        <NotesContext.Provider value={{notes, setNotes, updateNotes, deleteNote}}>
            {children}
        </NotesContext.Provider>
    )
};

function useNoteContext(){
    return useContext(NotesContext);
};

export default NotesProvider;
export {useNoteContext};