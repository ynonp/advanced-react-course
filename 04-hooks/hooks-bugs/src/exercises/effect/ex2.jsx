import React from 'react';

// This component waits 3 seconds after it mounted
// and then displays an alert showing how many times the user clicked on the button
// BUT it doesn't work - it always prints zero.
// find and fix the problem

export default function Ex2() {
  const [clickCount, setClickCount] = React.useState(0)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      alert(clickCount)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <div>
      <h1>Hello!</h1>
      <button onClick={() => setClickCount((prevCount) => prevCount + 1)}>
        Click me! (clicked {clickCount} times)
      </button>
    </div>
  )
}