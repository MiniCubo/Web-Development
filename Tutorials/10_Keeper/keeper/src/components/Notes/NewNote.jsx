import React, {useState} from "react";
import "./note.css"
import {useNoteContext} from "../../context/NotesProvider";

function NewNote(){
    const {updateNotes} = useNoteContext();
    const [entry, setEntry] = useState({
        title: "",
        content: "",
    })

    function update(event){
        const {name, value} = event.target;
        setEntry( prevEntry =>{
            return{...prevEntry, [name]:value,}
        }) 
    }

    function submit(e){
        e.preventDefault()
        updateNotes(entry)
        setEntry({
            title: "",
            content: "",
        })
    }

    return(
        <div>
            <form className="form" onSubmit={submit}>
                <input
                name='title'
                placeholder='Title'
                onChange={update} value = {entry.title}
                />
                <textarea
                name='content'
                placeholder='Take a note...'
                rows='3'
                onChange={update}
                value = {entry.content}
                />
                <input type="submit"></input>
            </form>
        </div>
    );
}

export default NewNote;