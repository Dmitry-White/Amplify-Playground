import React, { useState, useEffect } from 'react';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

import { fetchNotes, createNote, deleteNote } from './api';
import NoteItem from './components/NoteItem';

import './App.css';

const initialFormState = { name: '', description: '' }

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    (async () => {
      const notes = await fetchNotes();
      setNotes(notes);
    })()
  }, []);

  const createNoteHandler = async () => {
    const note = await createNote(formData);
    setNotes([...notes, note]);
    setFormData(initialFormState);
  }

  const deleteNoteHandler = async (note) => {
    const newNotesArray = await deleteNote(notes, note.id);
    setNotes(newNotesArray);
  }

  const noteList = notes.map(note => (
    <NoteItem
      key={note.id}
      note={note}
      deleteHandler={deleteNoteHandler}
    />
  ));

  return (
    <div className="App">
      <h1>My Notes App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value })}
        placeholder="Note name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value })}
        placeholder="Note description"
        value={formData.description}
      />
      <button onClick={createNoteHandler}>Create Note</button>
      <div style={{ marginBottom: 30 }}>
        {noteList}
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);