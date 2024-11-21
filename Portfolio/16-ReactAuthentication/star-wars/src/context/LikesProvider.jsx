import { set } from "mongoose";
import React, {useState, useContext, createContext} from "react";

const LikesContext = createContext();

function LikesProvider({children}){
    const [ld, setLD] = useState({
        "The phantom menace" : [0,0],
        "Attack of the clones" : [0,0],
        "Revenge of the Sith" : [0,0],
        "A new hope" : [0,0],
        "The empire strikes back" : [0,0],
        "The return of the Jedi" : [0,0],
    });
    const [verified, setVerified] = useState(null);

    function like(e){
        e.preventDefault();
        if(verified){
            var target = ld[e.target.name];
            var likes = target[0];
            var dislikes = target[1];
            setLD(prevLD=>{
                return{
                    ...prevLD, [e.target.name]: [likes+1, dislikes]
                }
            });
        }
    }

    function dislike(e){
        e.preventDefault();
        if(verified){
            var target = ld[e.target.name];
            var likes = target[0];
            var dislikes = target[1];
            setLD(prevLD=>{
                return{
                    ...prevLD, [e.target.name]: [likes, dislikes+1]
                }
            });
        }
    }

    return(
        <LikesContext.Provider value={{ld, like, dislike, verified, setVerified}}>
            {children}
        </LikesContext.Provider>
    )
}

function useLikesContext(){
    return useContext(LikesContext);
}

export default LikesProvider;
export {useLikesContext};