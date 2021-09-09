import './App.css';
import {useState} from 'react'

function App() {
  const [count, setCount] = useState(0)

  function addCount(){
    setCount(count + 1)
  }

  function minusCount(){
    setCount(count - 1)
  }

  return (
    <div className="App" data-test="">
      <p>The count is {count}</p>
      <button onClick={addCount}>Plus One</button>
      <button onClick={minusCount}>Minus One</button>
    </div>
  );
}

export default App;
