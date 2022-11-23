import { useState, useEffect } from 'react';

export default function Timer() {
  const [ms, setMs] = useState(1000);
  const [ticks, setTicks] = useState(0);
  const [ticking, setTicking] = useState(true);

  useEffect(() => {
    let clock = null;
    if (ticking) {
      clock = setInterval(() => {
        setTicks(t => t + 1);
      }, ms);
    }

    return () => {
      clearInterval(clock);
    };
  }, [ticking, ms]);

  function start() {
    setTicking(true);
  }

  function stop() {
    setTicking(false);
  }

  return (
    <div>
      <p>Ticks: {ticks}</p>
      {ticking
        ? <button onClick={stop}>Stop</button>
        : <button onClick={start}>Start</button>
      }
      <input type="number" value={ms} onChange={(e) => setMs(e.currentTarget.value)} />
    </div>
  );
}
