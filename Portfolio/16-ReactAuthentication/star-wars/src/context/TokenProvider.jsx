import React, {createContext, useContext, useState} from "react";

const TokenContext = createContext();

function TokenProvider({children}){
    const [token, setToken] = useState(false);
    const value = `${document.cookie}`;
    var parts = null;
    if(value === ""){
        parts = "Guest";
    }
    else{
        parts = value.split(`name=`);
    }
    const [name, setName] = useState(parts);

    return(
        <TokenContext.Provider value={{token, setToken, name, setName}}>
            {children}
        </TokenContext.Provider>
    );
}

function useTokenContext(){
    return useContext(TokenContext);
}

export default TokenProvider;
export {useTokenContext};