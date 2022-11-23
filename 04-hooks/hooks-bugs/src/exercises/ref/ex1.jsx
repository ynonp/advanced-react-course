import React, { useState, useCallback, useEffect, useRef } from "react";

// The component MeasureExample wants to show the height of the <h1>
// in its child component, but when the element disappears MeasureExample
// doesn't notice and keep showing the previous height

// Fix the code to show -1 if no <h1> is on the page

const Child = React.forwardRef(function Child(props, ref) {
  const [visible, setVisible] = useState(true);

  function toggle() {
    setVisible((v) => !v);
  }

  return (
    <>
      {visible && <h1 ref={ref}>Hello world</h1>}
      <button onClick={toggle}>Toggle</button>
    </>
  );
});

function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useRef(null);
  useEffect(() => {
    const node = measuredRef.current;
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    } else {
      setHeight(-1);
    }
  }, [measuredRef.current]);

  return (
    <>
      <Child ref={measuredRef} />
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
}

export default MeasureExample;

