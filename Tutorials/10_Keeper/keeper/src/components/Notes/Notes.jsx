import React from "react";
import Note from "./Note";
import "./note.css";
import {useNoteContext} from "../../context/NotesProvider";

function Notes(){
    const {notes} = useNoteContext();
    var data = notes.map((element)=>{
        return <Note title = {element.title} content = {element.content}/>
    });

    return(
        <div className="notesSection">
            {data}
        </div>
    )
}

export default Notes;