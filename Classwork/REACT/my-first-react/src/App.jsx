import './App.css';
import React, {useState} from "react";
import Header from './components/Header';
import Maths from "./components/Maths"
//import Pictures from './components/Pictures';
import Directory from './components/Directory';


function App() {

  var date = new Date();
  var dateFormated = date.toUTCString();
  var number = Math.floor(Math.random()*10);
  const [login, setLogin] = useState(false);

  function conditionalRender(){
    if(login){
      return <Directory/>
    }
    else{
      return(
        <div>
          <h2>You must log in to see the directory</h2>
          <button onClick={()=>{setLogin(true);}}>Log In</button>
        </div>
      )
    }
  }

  return (
    <div>
      <header className='App-header'>
        <Header num = {number}></Header>
        <Maths num = {number}>
          <p>Today is {dateFormated}</p>
        </Maths>
        {/*<Pictures></Pictures>*/}
      </header>
      <hr/>
      {conditionalRender()}
    </div>
  );
}

function Test(){
  console.log("A");
  return;
}

export default App;
export {Test};