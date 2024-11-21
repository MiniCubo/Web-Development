import React  from "react";
import { useMyContext, filterContacts } from "../context/DirectoryProvider";

function DirectoryFilter(props){
    const {state, dispatch} = useMyContext();

    function filter(e){
        filterContacts(dispatch, e.target.value)
    }

    return(
        <div>
            <label>Filter directory: </label>
            <input type="text" value = {state.filter} onChange={filter}/>
        </div>
    )   
}

export default DirectoryFilter;