import _ from 'lodash';
import { useState, useEffect } from 'react';

// This component displays the current window size
// It updates every {prop.updateMs} milliseconds
// This time the code works but there's still a hidden bug

// When is the effect triggered?
// Fix the effect to trigger only when needed
export default function WindowSize(props) {
  const { updateMs=1000 } = props;
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {   
    const handleResize = _.debounce(function handleResize() {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }, updateMs);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [props]);


  return (
    <p>Window Size: {width}x{height}. Updating every {updateMs}</p>
  );
}