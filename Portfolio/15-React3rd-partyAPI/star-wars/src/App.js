import './App.css';
import CommentsProvider from "./context/CommentsProvider";
import Cards from './components/Cards.jsx';
import {Routes, Route} from "react-router-dom"
import Character from './components/Character.jsx';
import LikesProvider from "./context/LikesProvider";


function App() {
  return (
    <div className="app">
      <LikesProvider>
        <Routes>
          <Route exact path='/' element = {<Cards/>}/>
          <Route path="/character/:title" element={
                <CommentsProvider>
                  <Character/>
                </CommentsProvider>
                }/>
        </Routes>
      </LikesProvider>
    </div>
  );
}

export default App;
