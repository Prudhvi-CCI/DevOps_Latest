import Notes from "./notes";
import NewNotes from "./noteCard";
import DeletedNotes from "./deletedNotes";
import config from "../config/config";
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

  const [renderBody,setRenderBody] = useState(false);

  useEffect(() => {
    //Database Code
    //STEP - 2 (Fetching the data from backend)
    const fetchData = async()=>{
      try {
        const response = await axios.get(`http://${config.backendBaseUrl}`);
        setNotes(response?.data!=null?response.data:null);
      } catch (err) {
        console.log(err,"yesss...");
      }
    }
      
      // try {
      //   await axios
      //     .get(`http://${config.backendBaseUrl}`)
      //     .then((response) => setNotes(response.data));
      // } catch (err) {
      //   console.log(err);
      // }

    
    // try {
    //   const response = await axios.get(`http://${config.backendBaseUrl}`);
    //   setNotes(response.data);
    //   // axios
    //   // .get(`http://${config.backendBaseUrl}`)
    //   // .then((response) => {
    //   //     setNotes(response.data)
    //   //   }); 
    //   } catch (err) {
    //     console.log(err);
    //   }

      fetchData()
    },[renderBody]); // Responsive result remove dependency array and check...

  //This function(setModal) is passed as props to child component and based on the click
  //in the child component we are changing its value to true in noteCard component
  //and that is reflecting the modal to show up in parent that is body component.

  const setModal = (isTrue, editNoteIndex) => {
    setModalCheck(isTrue);
    setEditIndex(editNoteIndex);
  };

  const updateBody = (updatedData)=>{
    setRenderBody(updatedData);
  }

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
      await axios.patch(`http://${config.backendBaseUrl}/${parseInt(editIndex)}`, {
        title: newTitle,
        description: newDescription,
      });
      setRenderBody(!renderBody);
    } catch (err) {
      console.log(err);
    }

    handleClose();
  };

  return (
    <div className="body">
      <Notes currentBody={renderBody} updateBody={setRenderBody}/>
      <h2>Your Notes...</h2>
      <hr />
      <div className="notesBox">
        {notes.map((note) => (
          <NewNotes
            key={note.id}
            title={note.title}
            description={note.description}
            date={note.date}
            setModal={setModal}
            currentBody={renderBody}
            updateBody={updateBody}
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
