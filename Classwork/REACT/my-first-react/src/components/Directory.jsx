import React from "react";
import Card from './Card';
import DirectoryFilter from "./DirectoryFilter";
import DirectoryNew from "./DirectoryNew";
import { useMyContext } from "../context/DirectoryProvider";

function Directory(){
    const {state} = useMyContext();

    var filteredContacts = state.contacts.filter((contact)=>{
      return contact.lname.toLowerCase().includes(state.filter) || contact.name.toLowerCase().includes(state.filter);
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

    return(
        <div>
            <DirectoryNew/>
            <hr/>
            <DirectoryFilter/>
            <p>The average age is: {totalAge/cards.length}</p>
            {cards}
        </div>
    )
}

export default Directory;