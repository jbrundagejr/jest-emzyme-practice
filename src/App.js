import './App.css';
import {useState} from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [error, setError] = useState("")

  function addCount(){
    setCount(count + 1)
    if(count === 0){
      setError(false)
    }
  }

  function minusCount(){
    setCount(count - 1)
    if(count <= 0){
      setCount(0)
      setError(true)
    }
  }

  return (
    <div data-test="component-app">
      <p data-test="counter-display">The count is <span data-test='display-number'>{count}</span></p>
      {error ? <p>Counter can't go below 0</p> : null}
      <button data-test="plus-one-button" onClick={addCount}>Plus One</button>
      <button data-test="minus-one-button" onClick={minusCount}>Minus One</button>
    </div>
  );
}

export default App;
