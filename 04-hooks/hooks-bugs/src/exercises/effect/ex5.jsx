import { useEffect, useRef, useState } from "react";

// This component should change the document title when component Foo enters the page
// and restore the previous value when Foo leaves the page,
// Unfortunately it doesn't work

// Find the bug and fix it

function useTitle(title) {
  const prevTitleRef = useRef(document.title);

  if (document.title !== title) document.title = title;

  useEffect(() => {
    return () => {
      document.title = prevTitleRef.current;
    };
  }, []);
}

function Foo() {
  useTitle("yay");
  return <p>Foo</p>;
}

export default function App() {
  const [show, setShow] = useState(true);

  return (
    <div className="App">
      {show && <Foo />}
      <input
        type="checkbox"
        checked={show}
        onChange={(e) => setShow(e.currentTarget.checked)}
      />
    </div>
  );
}
