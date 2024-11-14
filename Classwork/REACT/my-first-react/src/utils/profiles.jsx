const profiles = ["Jane", "Jack", "Jill"];

function validateProfile(handler){
    return profiles.includes(handler);
}

export {validateProfile};