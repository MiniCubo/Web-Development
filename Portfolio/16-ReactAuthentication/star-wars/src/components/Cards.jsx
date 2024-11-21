import React, { useEffect, useState } from "react";
import Card from "./CardBody";
import "./cards.css"
import instance from "../api/star-wars";

function Cards(){
    const [cards, setCards] = useState([]);
    // const {cards} = useCardsContext();
    useEffect(()=>{
        instance.get("/").then(response=>{
            setCards(response.data);
        })
        .catch(error=>{
            console.error("dsadsadsa you");
        })
    }, []);

    return(
        <>
            <div className="section">
                {cards.map((element, index) => (
                    <Card
                        key={index}
                        img={element.poster}
                        title={element.title}
                        year={element.year}
                    />
                ))}
            </div>
        </>
    )
}

export default Cards