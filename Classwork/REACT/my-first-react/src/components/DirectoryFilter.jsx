import React from "react";

function DirectoryFilter(props){
   
    return(
        <div>
            <label>Filter directory: </label>
            <input type="text" value = {props.value} onChange={props.action}/>
        </div>
    )   
}

export default DirectoryFilter;