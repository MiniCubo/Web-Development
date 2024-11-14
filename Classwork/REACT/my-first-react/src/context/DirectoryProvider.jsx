import React, {createContext, useContext, useState} from "react";
import contacts from "../data/data";

const DirectoryContext = createContext();

function DirectoryProvider({children}){
    const [data, setData] = useState([...contacts]);

    function addEntry(newContact){
        setData(prevData =>{
          return[...prevData, newContact]
        });
      }

    return(
        <DirectoryContext.Provider value = {{data, setData, addEntry}}>
            {children}
        </DirectoryContext.Provider>
    );
};

function useMyContext(){
    return useContext(DirectoryContext);
};

export default DirectoryProvider;
export { useMyContext};