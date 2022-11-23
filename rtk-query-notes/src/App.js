import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./data/store";
import notesApi from "./data/services/notes";

const { useGetNotesQuery, useCreateNoteMutation } = notesApi;

function NotesCount(props) {
  const { data, error, isLoading } = useGetNotesQuery();
  if (error) {
    return <p>Error ... {JSON.stringify(error)}</p>;
  }
  const notes = data || [];
  return <p>Total {notes.length} notes</p>;
}

function Notes(props) {
  const { data, error, isLoading } = useGetNotesQuery();
  const [createNote] = useCreateNoteMutation()

  const [newNoteText, setNewNoteText] = useState('');
  if (error) {
    return <p>Error ... {JSON.stringify(error)}</p>;
  }
  const notes = data || [];

  function addNote() {
    createNote(newNoteText);
    setNewNoteText('');
  }

  return (
    <div>
      <input type="text" value={newNoteText} onChange={(e) => setNewNoteText(e.currentTarget.value)} />
      <button onClick={addNote}>Add Note</button>
      <ul style={{ listStyle: "none" }}>
        {notes.map((note) => (
          <li>
            ({note.id}) {note.text}
          </li>
        ))}
      </ul>
    </div>

  );
}

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <NotesCount />
        <Notes />
      </div>
    </Provider>
  );
}
