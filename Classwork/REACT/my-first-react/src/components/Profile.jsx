import React, { useEffect } from "react";
import { validateProfile } from "../utils/profiles";
import { useParams} from "react-router-dom";
import { useState } from "react";

Profile.defaultProps = {
    user : "Jill"
};

function Profile(props){
    const [user, setUser] = useState(null);
    const [valid, setValid] = useState(false);
    var {handler} = useParams();
    var count = 0;

    useEffect(() =>{
        setUser(handler);
        setValid(validateProfile(handler))
    }, [handler, count]);

    return(
        <>
            <h3>The profile {user} is {valid ? "Valid" : "Invalid"}</h3>
        </>
    );
}

export default Profile;