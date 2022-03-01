import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'; 
import Counter from './Counter'; 

function App() {
  let num = 8; 
  return (
    <div className="App">
      <Navbar title = "no"/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          My favorite number is {num}!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Counter/> 
      </header>
    </div>
  );
}

export default App;
