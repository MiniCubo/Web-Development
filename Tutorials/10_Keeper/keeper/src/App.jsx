import './App.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import Notes from "./components/Notes/Notes"
import NewNote from './components/Notes/NewNote';
import NotesProvider from './context/NotesProvider';

import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Header/>
      <NotesProvider>
        <Routes>
          <Route exact path="/" element={
              <Notes/>
            }/>
          <Route exact path="/add" element={
              <NewNote/>
          }/>
        </Routes>
      </NotesProvider>
      
      <Footer/>
    </div>
  );
}

export default App;
