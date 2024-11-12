import React from "react";

const customStyle = {
    color: "red",
    fontSize: "20px",
    border: "1px solid white",
    backgroundColor: "white"
  };

function Header(props){
    var name = "Alvaro Samuel";
    var luckyNumber = props.num;
    var color = "";

    if(luckyNumber<5) color = "blue";
    if(luckyNumber>5) color = "green";
    if(luckyNumber===5) color = "rose";
    return(
        <div>
            <h1 style={customStyle}> Hello {name}</h1>
            <p className={color}>My lucky number is {luckyNumber}</p>
        </div>
    );
}

export default Header;