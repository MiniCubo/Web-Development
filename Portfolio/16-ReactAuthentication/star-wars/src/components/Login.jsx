import instance from "../api/star-wars.js";
import React, {useState} from "react";
import { useTokenContext } from "../context/TokenProvider.jsx";

function Login(){
    const [loginInformation, setLoginInformation] = useState(
        {
            name: "",
            password: "",
        }
    )
    const {setToken, setName} = useTokenContext();
    const [flag, setFlag] = useState(true)
    const [registerFailed, setRegisterFailed] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    function update(e){
        setLoginInformation(prevLoginInformation=>{
            return{
                ...prevLoginInformation,
                [e.target.name] : e.target.value
            }
        })
    }

    function logIn(e){
        e.preventDefault();
        instance.post("/login", loginInformation).then(response=>{
            setRegisterFailed(false);
            setLoginFailed(false);
            setToken(response.data.token);
            setName(response.data.name);
            console.log(response.data);
        }).catch(error=>{
            setLoginFailed(true);
            setRegisterFailed(false);
        });
        setLoginInformation(
            {
                name: "",
                password: "",
            }
        )
    }

    function register(e){
        e.preventDefault();
        instance.post("/register", loginInformation).then(response=>{
            setRegisterFailed(false);
            setLoginFailed(false);
            setToken(response.data.token);
            setName(response.data.name);
        }).catch(error=>{
            setRegisterFailed(true);
            setLoginFailed(false);
        });
        setLoginInformation(
            {
                name: "",
                password: "",
            }
        )
    }

    function conditionalRendering(){
        if(flag){
            return(
                <form onSubmit={logIn}>
                    <h1>Log In</h1>
                    <input type="text" value = {loginInformation.name} placeholder="Username" onChange={update} name = "name"/>
                    <input type="password" value = {loginInformation.password} placeholder="Password" onChange={update} name = "password"/>
                    <input type="submit"/>
                </form>
            )
        }
        else{
            return(
                <form onSubmit={register}>
                    <h1>Sign In</h1>
                    <input type="text" value = {loginInformation.name} placeholder="Username" onChange={update} name = "name"/>
                    <input type="password" value = {loginInformation.password} placeholder="Password" onChange={update} name = "password"/>
                    <input type="submit"/>
                </form>
            )
        }
    }

    function toggleFlag(e){
        e.preventDefault();
        setFlag(!flag);
    }

    var message = registerFailed ? <p>The user is already registered</p> : null;
    var message2 = loginFailed ? <p>The user doesn't exist or the password is incorrect</p> : null;

    return(
        <>
            {conditionalRendering()}
            <a href="/" onClick={toggleFlag}>{flag ? "Sign In" : "Log In"}</a>
            {message}
            {message2}
        </>
    )
}

export default Login;