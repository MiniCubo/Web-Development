import './App.css';
import CardsProvider from './context/CardsProvider';
import Cards from './components/Cards.jsx';

function App() {
  return (
    <div className="app">
      <CardsProvider>
        <Cards/>
      </CardsProvider>
    </div>
  );
}

export default App;
