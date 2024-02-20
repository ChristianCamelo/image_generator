import logo from './logo.svg';
import Canvas from './components/Canvas';
import Header from './components/Header';
import Buscador from './components/Buscador';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='container'>
        <Canvas/>
      </div>
    </div>
  );
}

export default App;
