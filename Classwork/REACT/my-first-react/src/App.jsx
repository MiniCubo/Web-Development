import './App.css';
import React, {useState} from "react";
import Header from './components/Header';
import Pictures from './components/Pictures';
import Directory from './components/Directory';
import Button from 'react-bootstrap/Button';
import AppNavbar from './components/AppNavbar';
import Profile from "./components/Profile";
import QProfile from './components/QProfile';
import { Routes,Route, Navigate } from 'react-router-dom';
import DirectoryProvider from './context/DirectoryProvider';


function App() {

  // var date = new Date();
  // var dateFormated = date.toUTCString();
  var number = Math.floor(Math.random()*10);
  const [login, setLogin] = useState(false);

  function conditionalRender(){
    if(login){
      return(
      <DirectoryProvider>
        <Directory/>
      </DirectoryProvider>
      );
    }
    else{
      return(
        <div>
          <h2>You must log in to see the directory</h2>
          <Button onClick={()=>{setLogin(true);}} variant="primary">Log In</Button>
          <button onClick={()=>{setLogin(true);}}>Log In</button>
        </div>
      )
    }
  }

  return (
    <div>
      <AppNavbar/>
      <Routes>
        <Route exact path="/" element={<Pictures/>} />
        <Route path="header" element={<Header num={number}/>}/>
        <Route path="directory" element={conditionalRender()} />
        <Route path="profile/:handler" element={<Profile />} />
        <Route path="qprofile" element={<QProfile />} />
        <Route path= "*" element={<Navigate to="/"/>}/>
      </Routes>
      {/* <header >
        <Header num = {number}></Header>
        <Maths num = {number}>
          <p>Today is {dateFormated}</p>
        </Maths>
        {<Pictures></Pictures>}
      </header>
      <hr/> */}
    </div>
  );
}

function Test(){
  console.log("A");
  return;
}

export default App;
export {Test};