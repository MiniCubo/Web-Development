import React from "react";

function ComCard(props){
    return(
        <div>
            <h5>{props.author}</h5>
            <p>{props.comment}</p>
        </div>
    )
}

export default ComCard;