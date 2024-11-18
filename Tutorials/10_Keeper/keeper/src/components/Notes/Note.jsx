import React from "react";
import "./note.css"
import Button from 'react-bootstrap/Button';
import { useNoteContext } from "../../context/NotesProvider";

function Note(props){
    const {deleteNote} = useNoteContext();

    function delNote(){
        deleteNote(props.title)
    }

    return(
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <Button variant="danger" onClick={delNote}>Delete</Button>
        </div>
    )
}

export default Note;