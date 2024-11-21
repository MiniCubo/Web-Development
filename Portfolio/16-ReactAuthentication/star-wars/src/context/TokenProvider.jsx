import React, {createContext, useContext, useState} from "react";

const TokenContext = createContext();

function TokenProvider({children}){
    const [token, setToken] = useState(null);
    const [name, setName] = useState("Guest");

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