import React from 'react';

const NoteItem = ({ note, deleteHandler }) => (
  <div>
    <h2>{note.name}</h2>
    <p>{note.description}</p>
    <button onClick={() => deleteHandler(note)}>Delete note</button>
  </div>
);

export default NoteItem;