import React, { useReducer, useState } from 'react'
import { useDeferredValue } from 'react';
import { useCallback } from 'react';
import tinycolor from 'tinycolor2';

const initialState = {
  deletedBoxes: new Set(),
};

function reducer(state, action) {
  switch(action.type) {
    case 'delete': 
      return { deletedBoxes: new Set([...state.deletedBoxes, Number(action.payload)]) }

    case 'reset':
      return initialState;
  }
}

const ColorBox = React.memo(function ColorBox(props) {
  const { start, spin, onClick, id } = props;
  const color = tinycolor(start).spin(spin).toString();

  return (
    <div
      onClick={onClick}
      data-id={id}
      style={{
        width: '100px',
        height: '100px',
        background: color,

        display: 'inline-block',
        margin: '5px',
      }} >{id}</div>
  );
});

function ColorPalette(props) {
  console.count('ColorPalette');

  const { start } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { deletedBoxes } = state;
  console.log(`render`);
  
  const removeBox = useCallback((e) => {    
    const id = e.target.dataset.id;
    dispatch({ type: 'delete', payload: id });
    // setDeletedBoxes(new deletedBoxes())
  }, [dispatch]);

  const colors = [];
  for (let i=-360; i < 360; i++) {
    if (deletedBoxes.has(i)) continue;

    colors.push(
      <ColorBox
        start={start}
        key={i}
        spin={i}
        onClick={removeBox}
        id={i}
      />
    );
  }
  return <>
    <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    {colors}
    </>
}

function App(props) {
  const [ticks, setTicks] = useState(0);
  const [color, setColor] = useState('#c3c3c3');
  const renderColor = useDeferredValue(color);

  console.count('ColorSelector');
  return (
    <div>
      <button onClick={() => setTicks(v => v + 1)}>Click Me ... {ticks}</button>
      <div>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value) } />
      </div>
      <ColorPalette start={renderColor} />
    </div>
  );
}

export default App
