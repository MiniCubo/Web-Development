import React from "react";
import { validateProfile } from "../utils/profiles";
import { useSearchParams } from "react-router-dom";

QProfile.defaultProps = {
    user : "Jill"
};

function QProfile(props){
    var [queryParameters] = useSearchParams();
    var handler = queryParameters.get("user");
    console.log(props.user)
    return(
        <>
            <h3>The profile {handler} is {validateProfile(handler) ? "Valid" : "Invalid"}</h3>
        </>
    );
}

export default QProfile;