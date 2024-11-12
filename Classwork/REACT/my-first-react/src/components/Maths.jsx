import React from "react";
import pi,{add, substract} from "../utils/math"


function Maths(props){
    var num = props.num;
    var num2 = Math.floor(Math.random()*10);
    return(
        <div>
            <p>The value of pi is {pi}</p>
            {props.children}
            <p> {num + "+" + num2} = {add(num,num2)}</p>
            <p> {num + "-" + num2} = {substract(num,num2)}</p>
        </div>
    );
}

export default Maths;