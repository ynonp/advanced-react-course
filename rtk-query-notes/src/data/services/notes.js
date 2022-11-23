// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from '@reduxjs/toolkit'
// Define a service using a base URL and expected endpoints

window.patches = [];

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://634fa864df22c2af7b5647a4.mockapi.io/api/v1/"
  }),
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => `/notes`,
    }),
    getNote: builder.query({
      query: (noteId) => `/notes/${noteId}`
    }),
    createNote: builder.mutation({
      query: (noteText) => ({
        url: `/notes`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: noteText }),
      }),      
      async onQueryStarted(noteText, { dispatch, queryFulfilled }) {
        let newNoteId = nanoid();

        const patchResult = dispatch(
          notesApi.util.updateQueryData('getNotes', undefined, (draft) => {
            draft.push({ text: noteText, id: newNoteId });
          }));
        const undo = function() {
        }
        window.patches.push(undo);
        try {
          const data = await queryFulfilled
          /*
          dispatch(
            notesApi.util.updateQueryData('getNotes', undefined, (draft) => {        
              return draft.map(d => d.id === newNoteId ? data.data : d )
            }));
            */
          
       } catch (err) {
        dispatch(
          notesApi.util.updateQueryData('getNotes', undefined, (draft) => {
            return draft.filter(note => note.id !== newNoteId);
          }));          
         }
      }
    })
  })
});

export default notesApi;
