import { useState } from 'react';
import ColorPicker, { colors } from "./ColorPicker"
import { useImmer } from "use-immer";
import './ImageEditor.css';

const initialImage = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
]

export default function ImageEditor() {
  const [color, setColor] = useState(0);
  const [image, setImage] = useImmer(initialImage);

  function handleChange(newColor) {
    setColor(newColor);
  }

  function paint(rowIndex, columnIndex) {
    setImage(draft => {
      draft[rowIndex][columnIndex] = color;
    });    
  }

  return (
    <div className='container'>
      <div className='image'>
        {
          image.map((row, rowNumber) => (
            <div className="row" key={rowNumber}>
              {row.map((pixel, columnNumber) => (
                <div
                  className="pixel"
                  style={{ backgroundColor: colors[pixel], cursor: 'pointer' }}
                  key={columnNumber}
                  onClick={() => paint(rowNumber, columnNumber)}
                />
              ))}
            </div>
          ))
        }        
      </div>
      <ColorPicker color={color} onChangeColor={handleChange} />
    </div>

    
  )
}