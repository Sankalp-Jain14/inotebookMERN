import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  
   //Get All Notes

  const getNotes = async() =>{
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method:"GET",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YzgzODQxMWM2ZGZmZGVkYjhkMTMyIn0sImlhdCI6MTY4NTg4MTczMn0.VGIZIWa3MOTtbSiT2Jdwkp_t1NTWn2CYX50UVjiFsaU"
      }
      
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)

  }
  



  //Add a Note
  const addNote = async (title,description,tag)=>{
    // TODO : API Call

    //API Call
    const response = await fetch(`${host}/api/notes/addnote`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YzgzODQxMWM2ZGZmZGVkYjhkMTMyIn0sImlhdCI6MTY4NTg4MTczMn0.VGIZIWa3MOTtbSiT2Jdwkp_t1NTWn2CYX50UVjiFsaU"
      },
      body: JSON.stringify({title , description , tag})
    });
    const json = response.json();
     
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
  const deleteNote = (id)=>{
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
  }

  //Edit a Note
  const editNote = async (id, title, description , tag)=>{
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:"POST",
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ3YzgzODQxMWM2ZGZmZGVkYjhkMTMyIn0sImlhdCI6MTY4NTg4MTczMn0.VGIZIWa3MOTtbSiT2Jdwkp_t1NTWn2CYX50UVjiFsaU"
      },
      body: JSON.stringify({title , description , tag})
    });
    const json = response.json();

     
    // Logic to edit in client
    for (let index = 0; index < notes.length ; index++){
      const element = notes[index];
      if(element._id ===id){
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }


  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
