import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "647c8770ff32c5ee01709448",
      user: "647c838411c6dffdedb8d132",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-06-04T12:45:36.689Z",
      __v: 0,
    },
    {
      _id: "647c8770ff32c5ee0170944a",
      user: "647c838411c6dffdedb8d132",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-06-04T12:45:36.814Z",
      __v: 0,
    },
    {
      _id: "647c8770ff32c5ee0170944c",
      user: "647c838411c6dffdedb8d132",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-06-04T12:45:36.927Z",
      __v: 0,
    },
    {
      _id: "647c8771ff32c5ee0170944e",
      user: "647c838411c6dffdedb8d132",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-06-04T12:45:37.081Z",
      __v: 0,
    },
    {
      _id: "647c8771ff32c5ee01709450",
      user: "647c838411c6dffdedb8d132",
      title: "My Title",
      description: "Please wake up early",
      tag: "personal",
      date: "2023-06-04T12:45:37.311Z",
      __v: 0,
    },
    {
      _id: "647ca825ff32c5ee01709453",
      user: "647c838411c6dffdedb8d132",
      title: "My Title",
      description: "Please access the playlist",
      tag: "Youtube",
      date: "2023-06-04T15:05:09.089Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesInitial);

  //Add a Note
  const addNote = (title,description,tag)=>{
    // TODO : API Call
    console.log("Adding a new Note")
    const note = {
      _id: "647ca825ff32c5ee01709453",
      user: "647c838411c6dffdedb8d1324",
      title: title,
      description: description,
      tag: tag,
      date: "2023-06-04T15:05:09.089Z",
      __v: 0,
    };
    setNotes(notes.concat(note))
  }

  //Delete a Note
  const deleteNote = ()=>{

  }

  //Edit a Note
  const editNote = ()=>{
    
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
