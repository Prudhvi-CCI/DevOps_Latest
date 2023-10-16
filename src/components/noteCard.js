import "../App.css";
import config from "../config/config";
import axios from "axios";

function NoteCard({key,title,description,data,setModal,currentBody,updateBody}) {

  const handleDelete = async () => {
    //Database Code
    //STEP - 4 (Deleting the data from the backend)
    try {
      await axios.delete(
        `http://${config.backendBaseUrl}/${parseInt(key)}`,
        (response) => {
          console.log(response.data);
        }
      );
      updateBody((prevState)=>{
        prevState = !prevState;
      })
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = () => {
    setModal(true, key); //This is parent component function passed as props.
  };

  return (
    <div className="newNotes">
      <div>
        <h3>{title}</h3>
        <p data-testid="test-desc">{description}</p>
        <button onClick={handleOpenModal}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

// Default Props HIGHLY IMPORTANT
// NoteCard.defaultProps = {
//   title: '',
//   description: '',
//   date: ''
// };

export default NoteCard;
