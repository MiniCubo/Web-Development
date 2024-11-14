import React from "react";
import Card from './Card';
import { useState } from 'react';
import DirectoryFilter from "./DirectoryFilter";
import DirectoryNew from "./DirectoryNew";
import { useMyContext } from "../context/DirectoryProvider";

function Directory(){
    const [filter, setFilter] = useState("");
    // const [data, setData] = useState([...contacts]);
    const {data} = useMyContext();

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
        return totalAge +  Number(age);
      }, 0
    )

    function updateFilter(event){
        setFilter(event.target.value.toLowerCase());
      }
    
    return(
        <div>
            <DirectoryNew/>
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