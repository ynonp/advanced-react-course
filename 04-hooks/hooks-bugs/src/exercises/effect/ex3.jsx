import { useEffect, useState } from "react";

// This component shows an input box and should update the
// document.title every second with the latest value from the input box

// but ... it doesn't work
// find and fix the bug

export default function Ex3() {
  const [title, setTitle] = useState('Hello World');

  function sync() {
    document.title = title;
  }

  useEffect(() => {
    const id = setInterval(() => {
      sync();
    }, 1000);
    return () => {
      clearInterval(id)
    }
  }, []);

  return (
    <div>
      <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)} />      
    </div>
  )
}