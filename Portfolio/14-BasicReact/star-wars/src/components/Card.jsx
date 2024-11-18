import React, {useState} from "react";
import "./card.css"

function Card(props){
    const [ld, setLD] = useState([0,0]);

    var image_src = "./images/"+props.img;
    
    var direction = "/"+props.title

    function extra(e){
        e.preventDefault();
        props.action(props.title)
    }

    function like(e){
        e.preventDefault();
        var likes = ld[0];
        var dislikes = ld[1];
        setLD([likes+1, dislikes])
    }

    function dislike(e){
        e.preventDefault();
        var likes = ld[0];
        var dislikes = ld[1];
        setLD([likes, dislikes+1])
    }

    return(
        <div className="card">
            <img src = {image_src} alt={props.title}></img>
            <div className="info">
                <h3>{props.title}</h3>
                <p>{props.year}</p>
                <a href={direction} onClick={extra}>More...</a>
                <div>
                    <a href={direction} onClick={like}>{ld[0]}<img src="./images/like.png" alt = "like"/></a>
                    <a href={direction} onClick={dislike}>{ld[1]}<img src="./images/dislike.png" alt = "like"/></a>
                </div>
            </div>
        </div>
    )
}

export default Card;