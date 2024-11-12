import React from "react";
import logo from "../img/logo.svg";

const img_src = "https://picsum.photos/200";
function Pictures(){
    return(
        <div>
            <img src = {img_src + "?grayscale"} alt = "random picture"/>
            <img className='App-logo' src={logo} alt='React logo'/>
        </div>
    );
}

export default Pictures;