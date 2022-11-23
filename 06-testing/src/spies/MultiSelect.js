export default function MultiSelect({
  items,
  onChange,
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <label>
            <input type="checkbox" checked={item.checked} onChange={(e) => onChange(item.id, e.currentTarget.checked)} />
              {item.text}
          </label>
        </li>
      ))}
    </ul>
  );
}
