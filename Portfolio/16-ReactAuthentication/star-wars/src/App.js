import './App.css';
import CommentsProvider from "./context/CommentsProvider";
import Cards from './components/Cards.jsx';
import {Routes, Route, Navigate} from "react-router-dom"
import Character from './components/Character.jsx';
import LikesProvider from "./context/LikesProvider";
import Login from './components/Login.jsx';
import AppNavbar from './components/AppNavbar.jsx';
import TokenProvider from './context/TokenProvider.jsx';

function App() {
  return (
    <div className="app">
    <TokenProvider>
      <AppNavbar/>
      <LikesProvider>
          <Routes>
            <Route exact path='/' element = {<Cards/>}/>
            <Route path="/:title" element={
                  <CommentsProvider>
                    <Character/>
                  </CommentsProvider>
                  }/>
            <Route path = "/profile" element = {<Login/>}/>
            <Route path = "*" element = {<Navigate to="/"/>}/>
          </Routes>
      </LikesProvider>
      </TokenProvider>
    </div>
  );
}

export default App;
