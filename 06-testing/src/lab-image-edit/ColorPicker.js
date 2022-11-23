import './ColorPicker.css';

export const colors = ['white', 'black', 'red', 'green', 'yellow', 'pink', 'orange', 'brown'];

export default function ColorPicker({
  onChangeColor,
  color,
}) {
  return (
    <ul className="color-picker">
      {colors.map((clr, index) => (
        <li          
          style={{ backgroundColor: clr,  outline: color === index ? '2px solid purple' : 'none' }}
          key={clr}
          onClick={() => onChangeColor(index)}
        />
      ))}
    </ul>    
  )
}