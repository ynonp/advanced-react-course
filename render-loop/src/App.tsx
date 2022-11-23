import React from "react";
import ReactDOM from "react-dom";
import { useState, useMemo, useCallback } from "react";

React.memo = function MyReactMemo(Component) {
  return function Component2(props) {
    const value = useMemo(() => <Component {...props} />, Object.values(props))
    return value;
  }
}


function Header() {
  console.count("Header.render");

  return <h1>My Counter Demo</h1>;
}

const DisplayValue = React.memo(function DisplayValue(props: { val: number }) {  
  console.count("DisplayValue.render");
  const { val } = props;
  return <p>Value: {val}</p>;
});

type DisplayMod5Props = {
  val: number;
};
const DisplayMod5 = React.memo(function DisplayMod5(props: DisplayMod5Props) {
  console.count("DisplayMod5.render");

  const { val } = props;
  const text =
    val % 5 === 0 ? "Value is divisible by 5" : "Value does not divide by 5";

  return <p>{text}</p>;
}, function propsAreEqual(prevProps: DisplayMod5Props, nextProps: DisplayMod5Props) {
  return (prevProps.val % 5 === 0) === (nextProps.val % 5 === 0);
});







const MyButton = React.memo(function MyButton(props: { onClick: () => void }) {
  console.count("MyButton.render");
  return <button onClick={props.onClick}>Click Me</button>;
});


export default function Counter() {
  return (
    <>
      <Header />
      <CounterInput />
    </>
  )
}

function CounterInput() {
  console.count("Counter.render");

  const [count, setCount] = useState(0);
  const [delta, setDelta] = useState(1);

  /*
  function inc() {
    setCount(val => val + delta);
  }
  */

  const inc = useCallback(function inc() {
    setCount(val => val + delta);
  }, [delta]);

/*
  const inc = useMemo(() => function inc() {
    setCount(val => val + delta);
  }, [delta]);
*/

  return (
    <>
      <label>
        Increase by:
        <input
          type="number"
          value={delta}
          onChange={e => setDelta(Number(e.target.value))}
        />
      </label>
      <DisplayValue val={count} />
      <DisplayMod5 val={count} />
      <MyButton onClick={inc} />
    </>
  );
}
