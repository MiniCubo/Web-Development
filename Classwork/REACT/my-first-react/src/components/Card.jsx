import React from "react";
import "./Card.css"

function Card(props){
  const img_src = "https://picsum.photos/200";
  var fullname = props.name + " "+ props.lname;
    return(
        <div className="card">
            <div className="top">
                <h2 className="name">{fullname}</h2>
                <img src = {props.picture} alt = {fullname} className="circle-img" />
            </div>
            <div className="bottom">
                <p>{props.phone}</p>
                <p>Age: {props.age}</p>
            </div>
        </div>
    );
}

export default Card;