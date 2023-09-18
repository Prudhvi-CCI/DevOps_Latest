import "../App.css";

import React, { useState } from "react";
import config from "../config/config";
import axios from "axios";

function Notes(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");

  const handleTitleChange = (event) => {
    let ttl = event.target.value;
    setTitle(ttl);
  };

  const handleDescriptionChange = (event) => {
    let desc = event.target.value;
    setDescription(desc);
  };

  const handlePasswordChange = (event)=>{
    let pass = event.target.value;
    setPassword(pass);
  }

  const handleAddNote = async () => {
    // Passing To BackEnd
    // STEP - 1
    console.log("reached...");

    let date = new Date();

    try {
      await axios.post(`http://${config.backendBaseUrl}`, {
          title: title,
          description: description,
          password: password,
          date: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
      })
      setTitle('');
      setDescription('');
      setPassword('');   
      props.updateBody(!props.currentBody);        
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="notes">
        <input
          id="title"
          type="text"
          onChange={handleTitleChange}
          placeholder="Enter title.."
          value={title}
        />
        <textarea
          id="description"
          placeholder="Enter description.."
          onChange={handleDescriptionChange}
          rows="7"
          cols="40"
          value={description}
        ></textarea>
        <input
          id="password"
          type="text"
          onChange={handlePasswordChange}
          placeholder="Enter password.."
          value={password}
        />
        <button id="addNote" onClick={handleAddNote}>
          Add Note
        </button>
      </div>
    </>
  );
}

export default Notes;
