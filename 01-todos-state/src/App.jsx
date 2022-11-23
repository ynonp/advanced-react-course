import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom';

function TodoList(props) {
  const { items, toggleDone } = props;
  // const showList = items.any(i => i.done);

  return (
    <>
      <p>Total: {items.length} items. Left To Do {items.filter(it => !it.done).length}</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <label>
              <input type="checkbox" checked={item.done} onChange={() => toggleDone(item)} />
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}



function App() {
  const [items, setItems] = useState([
    { id: 1, text: 'write code', done: false },
    { id: 2, text: 'fix the code', done: false },
    { id: 3, text: 'push to production', done: false },
    { id: 4, text: 'hotfix critical bugs in new code', done: false },
  ]);
  
  function toggleDone(item) {
    for (let i=0; i < 100000; i++) {
      console.log('yay');
    }

    setItems(items.map(it => 
      it.id === item.id ? { ...item, done: !item.done } : it
    ));
  }

  return (
    <>
    <TodoList items={items} toggleDone={toggleDone} />
    <hr />
    <p>{items.filter(i => i.done).length} items done</p>
    </>
  )
}

export default App



