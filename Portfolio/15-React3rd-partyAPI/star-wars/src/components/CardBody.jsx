import "./card.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { useLikesContext } from "../context/LikesProvider";

function CardBody(props){
    const {ld, like, dislike} = useLikesContext();
    const target = ld[props.title];

    var image_src = "./images/"+props.img;
    
    var direction = "/"+props.title

    var link = "/character/"+ props.title;

    return(
        <div className="d-flex justify-content-around">
            <Card>
                <Card.Img variant="top" src={image_src} alt={props.title} />
                <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                {props.year}
                </Card.Text>
                <Button as={Link} to = {link} variant="primary" >More...</Button>
                <div className="vote">
                    <Button variant="outline-light" href={direction} onClick={like} name = {props.title}>{target[0]}<img src="./images/like.png" alt = "like" name = {props.title}/></Button>
                    <Button variant="outline-light" href={direction} onClick={dislike} name = {props.title}>{target[1]}<img src="./images/dislike.png" alt = "like" name = {props.title}/></Button>
                </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default CardBody;