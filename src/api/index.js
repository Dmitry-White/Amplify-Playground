import { API } from 'aws-amplify';

import { listNotes } from '../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../graphql/mutations';

const fetchNotes = async () => {
  const apiData = await API.graphql({ query: listNotes });
  return apiData.data.listNotes.items;
}

const createNote = async (form) => {
  if (!form.name || !form.description) return;
  const apiData = await API.graphql({ query: createNoteMutation, variables: { input: form } });
  return apiData.data.createNote;
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