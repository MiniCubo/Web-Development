import React, {useState, useEffect} from "react";
import "./character.css";
import { useCommentsContext } from "../context/CommentsProvider";
import ComCard from "./Comments/ComCard";

function Character(props){
    const [img_src, setImage] = useState("./images/"+props.char_image);
    const [entry, setEntry] = useState({
        movie: "",
        author: "",
        comment: "",
    })
    const {comments, filterComments, addComment} = useCommentsContext();

    function filteredComments(){
        var f = filterComments(props.movie);
        var commentCards = [];
        if(f){
            f.forEach((e)=>{
                commentCards.push(<ComCard 
                    author={e.author}
                    comment = {e.comment}
                />);
            })
        }

        return commentCards;
    }

    var color = (props.affiliation === "Jedi" || props.affiliation === "Rebellion") ? "blue" : "red";

    useEffect(()=>{
        setImage("./images/"+props.char_image)
    }, [props.char_image]);

    const style = {
        color : color
    };

    function Hover(){
        setImage("./images/"+props.affiliation+".png");
    }

    function update(e){
        var {name, value} = e.target;
        setEntry(prevEntry=>{
            return{
                ...prevEntry,
                movie: props.movie,
                [name] : value
            }
        })
    }

    function submit(e){
        e.preventDefault();
        addComment(entry);
        setEntry(
            {
                movie: "",
                author: "",
                comment: "",
            }
        );
    }

    return(
        <>
            <div className="char">
                <img src={img_src} alt={props.name} onMouseEnter={Hover} onMouseOut={()=>{setImage("./images/"+props.char_image)}}/>
                <div>
                    <h2>{props.name}</h2>
                    <p style={style}>{props.affiliation}</p>
                    <p>{props.bio}</p>
                </div>
            </div>
            <div className="comments">
                <h4 style={{color:"blue"}}>Comments</h4>
                {filteredComments()}
            </div>
            <form className="comments" onSubmit={submit}>
                <h4>Add a comment</h4>
                <input type="text" value = {entry.author} name= "author" placeholder="Author" onChange={update}></input>
                <textarea row="5" value = {entry.comment} name= "comment" placeholder="What do you want to say?" onChange={update}></textarea>
                <input type="submit"/>
            </form>
        </>
        
    )
}

export default Character;