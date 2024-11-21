import React, {createContext, useContext, useReducer} from "react";
import contacts from "../data/data";
import DirectoryReducer from "./DirectoryReducer";


const DirectoryContext = createContext();

function DirectoryProvider({children}){
    const initialState = {
        contacts,
        filter : ""
    }

    const [state, dispatch] = useReducer(DirectoryReducer, initialState);

    // function addEntry(newContact){
    //     setData(prevData =>{
    //       return[...prevData, newContact]
    //     });
    //   }

    return(
        <DirectoryContext.Provider value = {{state, dispatch}}>
            {children}
        </DirectoryContext.Provider>
    );
};

function useMyContext(){
    return useContext(DirectoryContext);
};

function addContact(dispatch, newContact){
    dispatch({
        type: "ADD_CONTACT",
        payload: newContact,
    })
}

function filterContacts(dispatch, filter){
    dispatch({
        type:"FILTER",
        payload: filter
    })
}

export default DirectoryProvider;
export { useMyContext, addContact, filterContacts };