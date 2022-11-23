import React,{ useState } from 'react'

function DieAfterTen() {
  const [counter, setCounter] = useState(0);
  
  if (counter > 10) {
    throw 'Ouch';
  }

  return (
    <button style={{margin: '10px' }} onClick={() => setCounter(c => c + 1)}>{counter}</button>
  )
}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
        <h1>Something went wrong.</h1>
        <button onClick={this.props.reset}>Reset</button>
        </>        
      )
    }

    return this.props.children; 
  }
}

function App() {  
  const [k, s] = useState(0);

  function reset() {
    s(v => v + 1);
  }
  return (
    <>
    <ErrorBoundary reset={reset} key={k}>
      <DieAfterTen />
      <DieAfterTen />
      <DieAfterTen />
    </ErrorBoundary>
    </>
  )
}

export default App

