import Notes from "./notes";
import NewNotes from "./noteCard";
import DeletedNotes from "./deletedNotes";

import React, { useState, useEffect } from "react";

import Modal from "@material-ui/core/Modal";

import "../App.css";
import axios from "axios";

function Body() {
  const [notes, setNotes] = useState([]);
  const [modelCheck, setModalCheck] = useState(false);

  //Updated Note Data
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  //Updating Note Index
  const [editIndex, setEditIndex] = useState(0);

  useEffect(() => {
    //Database Code
    //STEP - 2 (Fetching the data from backend)
    try {
      axios
        .get("http://192.168.0.106:3001/note")
        .then((response) => setNotes(response.data));
    } catch (err) {
      console.log(err);
    }
  },[]); // Responsive result remove dependency array and check...

  //This function(setModal) is passed as props to child component and based on the click
  //in the child component we are changing its value to true in noteCard component
  //and that is reflecting the modal to show up in parent that is body component.

  const setModal = (isTrue, editNoteIndex) => {
    setModalCheck(isTrue);
    setEditIndex(editNoteIndex);
  };

  const handleClose = () => {
    setModalCheck(false);
  };

  const handleTitleChange = (e) => {
    let title = e.target.value;
    setNewTitle(title);
  };

  const handleDescChange = (e) => {
    let desc = e.target.value;
    setNewDescription(desc);
  };

  const handleModify = async () => {
    //For Database Purpose

    try {
      await axios.patch(`http://192.168.0.106:3001/note/${parseInt(editIndex)}`, {
        title: newTitle,
        description: newDescription,
      });
    } catch (err) {
      console.log(err);
    }

    handleClose();
  };

  return (
    <div className="body">
      <Notes />
      <h2>Your Notes...</h2>
      <hr />
      <div className="notesBox">
        {notes.map((note) => (
          <NewNotes
            id={note.id}
            title={note.title}
            description={note.description}
            date={note.date}
            setModal={setModal}
          />
        ))}
      </div>
      <Modal
        onClose={handleClose}
        open={modelCheck}
        className="modal"
        style={{
          position: "absolute",
          border: "2px solid #000",
          // backgroundColor: 'gray',
          boxShadow: "2px solid black",
          height: 100,
          width: 300,
          margin: 300,
          padding: "10px",
          display: "flex",
        }}
      >
        <div className="modalView">
          <input type="text" onChange={handleTitleChange} />
          <textarea rows="3" cols="20" onChange={handleDescChange}></textarea>
          <button onClick={handleModify}>Modify Data</button>
        </div>
      </Modal>
    </div>
  );
}

export default Body;
