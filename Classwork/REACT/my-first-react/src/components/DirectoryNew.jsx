import React from "react";
import { useState } from "react";
import { useMyContext } from "../context/DirectoryProvider";

function DirectoryNew(props){
    const {setData, addEntry} = useMyContext();
    const [entry, setEntry] = useState({
        name: "",
        lname: "",
        picture: "https://picsum.photos/200",
        phone: "",
        age: 0,
   });

//    function addEntry(newContact){
//     setData(prevData =>{
//       return[...prevData, newContact]
//     });
//   }

   function update(event){
    const {name, value} = event.target;
        setEntry(prevEntry => { 
            return {
            ...prevEntry,
            [name]: value,
            }
        });
   }

   function submit(event){
        event.preventDefault();
        addEntry(entry);
        setEntry({
            name: "",
            lname: "",
            picture: "https://picsum.photos/200",
            phone: "",
            age: 0,
        })
   }

    return(
        <>
            <form onSubmit={submit}>
                <input type = "text" placeholder="Name" name = "name" onChange={update} value = {entry.name}></input><br/>
                <input type = "text" placeholder="Last Name" name= "lname" onChange={update} value = {entry.lname}></input><br/>
                <input type = "tel" placeholder="Phone" name = "phone" onChange={update} value = {entry.phone}></input><br/>
                <input type = "number" placeholder="Age" name = "age" onChange={update} value = {entry.age}></input><br/>
                <button type = "submit" >Add</button>
            </form>
        </>
    )
}

export default DirectoryNew;