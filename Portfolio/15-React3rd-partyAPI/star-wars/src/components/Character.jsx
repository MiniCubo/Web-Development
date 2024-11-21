import React, {useState, useEffect} from "react";
import "./character.css";
import { useParams } from "react-router-dom";
import ComCard from "./Comments/ComCard";
import Figure from 'react-bootstrap/Figure';
import instance from "../api/star-wars";

function Character(props){
    const [cards, setCards] = useState([]);
    const {title} = useParams();
    const [entry, setEntry] = useState({
        movie: "",
        author: "",
        comment: "",
    })
    const [comments, setComments] = useState([]);

    useEffect(()=>{
        instance.get("/").then(response=>{
            setCards(response.data);
        })
        .catch(error=>{
            console.error("Fusdasdask you");
        })
    }, []);

    useEffect(()=>{
        instance.get("/comments/"+title).then(response=>{
            setComments(response.data);
            })
        .catch(error=>{
            console.error("Fusdasdask you");
        });
    }, []);

    console.log("text", comments);

    var movie = cards.find((card)=>{
        return card.title === title
    });

    if (movie){
        var {affiliation, name, image, bio} = movie.best_character;
    }

    const [img_src, setImage] = useState("./images/"+image);

    var color = (affiliation === "Jedi" || affiliation === "Rebellion") ? "blue" : "red";

    useEffect(()=>{
        setImage("./images/"+image)
    }, [image]);

    const style = {
        color : color
    };

    function Hover(){
        setImage("./images/"+affiliation+".png");
    }

    function update(e){
        var {name, value} = e.target;
        setEntry(prevEntry=>{
            return{
                ...prevEntry,
                movie: title,
                [name] : value
            }
        })
    }

    async function submit(e){
        e.preventDefault();
        const response = await instance.post("/comments/"+title,entry);
        setComments(response.data);
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
            <Figure style={{margin:"100px"}}>
                <Figure.Image
                    width={200}
                    height={300}
                    src={img_src} alt={name} onMouseEnter={Hover} onMouseOut={()=>{setImage("./images/"+image)}}
                />
                <Figure.Caption>
                    <h2>{name}</h2>
                    <p style={style}>{affiliation}</p>
                    <p>{bio}</p>
                </Figure.Caption>
            </Figure>
            <div className="comments">
                <h4 style={{color:"blue"}}>Comments</h4>
                {comments.map((comment)=>(
                <ComCard 
                    author={comment.author}
                    comment = {comment.comment}
                />))}
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