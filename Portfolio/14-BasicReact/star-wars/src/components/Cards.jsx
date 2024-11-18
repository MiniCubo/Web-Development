import React, { useState } from "react";
import { useCardsContext } from "../context/CardsProvider";
import CommentsProvider from "../context/CommentsProvider";
import Card from "./Card";
import "./cards.css"
import Character from "./Character";

function Cards(){
    const {cards} = useCardsContext();
    const [selectedMovie, setMovie] = useState(null);

    function selectMovie(){
        var movie = cards.find((card)=>{
            return card.title === selectedMovie
        })
        if (movie){
            var {affiliation, name, image, bio} = movie.best_character;
            return(
                    <Character 
                    movie = {movie.title}
                    char_image = {image}
                    affiliation = {affiliation}
                    name = {name}
                    bio = {bio}
                />
            )
        }
    }

    const obj = cards.map((element)=>{
        return <Card
        img = {element.poster}
        title = {element.title}
        year = {element.year}
        action = {setMovie}
        />
    })

    return(
        <>
            <div className="section">
                {obj}
            </div>
            <CommentsProvider>
                {selectMovie()}
            </CommentsProvider>
        </>
    )
}

export default Cards