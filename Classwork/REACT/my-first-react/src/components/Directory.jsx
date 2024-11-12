import React from "react";
import Card from './Card';
import contacts from '../data/data';
import { useState } from 'react';
import DirectoryFilter from "./DirectoryFilter";
import DirectoryNew from "./DirectoryNew";

function Directory(){
    const [filter, setFilter] = useState("");
    const [data, setData] = useState([...contacts]);

    var filteredContacts = data.filter((contact)=>{
      return contact.lname.toLowerCase().includes(filter) || contact.name.toLowerCase().includes(filter);
    })
  
    var cards = filteredContacts.map((contact)=>(
        <Card 
        name = {contact.name} 
        lname = {contact.lname} 
        picture = {contact.picture} 
        phone = {contact.phone} 
        age = {contact.age}/>
      )
    );
  
    var totalAge = filteredContacts.reduce(
      (totalAge, {age})=>{
        return totalAge + age;
      }, 0
    )

    function updateFilter(event){
        setFilter(event.target.value.toLowerCase());
      }

    function addEntry(newContact){
      setData(prevData =>{
        return[...prevData, newContact]
      });
    }
    
    return(
        <div>
            <DirectoryNew action = {addEntry}/>
            <hr/>
            <DirectoryFilter
                value = {filter}
                action = {updateFilter}
            />
            <p>The average age is: {totalAge/cards.length}</p>
            {cards}
        </div>
    )
}

export default Directory;