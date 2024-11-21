import React, {useContext, createContext, useState} from "react";
import data from "../data/data"

const CardsContext = createContext();

function CardsProvider({children}){
    const [cards, setCards] = useState([...data])
    
    return(
        <CardsContext.Provider value = {{cards, setCards}}>
            {children}
        </CardsContext.Provider>
    )
}

function useCardsContext(){
    return useContext(CardsContext);
}

export default CardsProvider;
export {useCardsContext};