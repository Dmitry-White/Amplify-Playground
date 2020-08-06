import { API, Storage } from 'aws-amplify';

import { listNotes } from '../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../graphql/mutations';

const fetchNotes = async () => {
  const apiData = await API.graphql({ query: listNotes });
  const notesFromAPI = apiData.data.listNotes.items;
  await Promise.all(notesFromAPI.map(async note => {
    if (note.image) {
      const image = await Storage.get(note.image);
      note.image = image;
    }
    return note;
  }))
  return notesFromAPI;
}

const createNote = async (form) => {
  if (!form.name || !form.description) return;
  const apiData = await API.graphql({ query: createNoteMutation, variables: { input: form } });

  const note = apiData.data.createNote;
  if (form.image) {
    const image = await Storage.get(form.image);
    note.image = image;
  }

  return note;
}

const deleteNote = async (notes, noteId) => {
  await API.graphql({ query: deleteNoteMutation, variables: { input: { id: noteId } } });

  const newNotesArray = notes.filter(note => note.id !== noteId);
  return newNotesArray;
}

export {
  fetchNotes,
  createNote,
  deleteNote
}