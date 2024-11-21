import React, {useContext, createContext, useState} from "react";

const CommentsContext = createContext();

function CommentsProvider({children}){
    const [comments, setComments] = useState([{
        movie: "The phantom menace",
        author: "Yo",
        comment: "Ass",
    }]);

    function addComment(newComment){
        setComments(prevComments =>{
            return[...prevComments, newComment];
        }
        );
    }

    function filterComments(criteria){
        return comments.filter((element)=>{
            return element.movie === criteria;
        })
    }
    return(
        <CommentsContext.Provider value = {{comments, setComments, addComment, filterComments}}>
            {children}
        </CommentsContext.Provider>
    )
}

function useCommentsContext(){
    return useContext(CommentsContext);
}

export default CommentsProvider;
export {useCommentsContext};