import "../App.css";
import config from "../config/config";
import axios from "axios";

function NoteCard(props) {
  const handleDelete = async () => {
    //Database Code
    //STEP - 4 (Deleting the data from the backend)
    try {
      await axios.delete(
        `http://${config.backendBaseUrl}/${parseInt(props.id)}`,
        (response) => {
          console.log(response.data);
        }
      );
      props.updateBody(!props.currentBody)
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = () => {
    props.setModal(true, props.id); //This is parent component function passed as props.
  };

  return (
    <div className="newNotes">
      <div>
        <h3>{props.title}</h3>
        <p data-testid="test-desc">{props.description}</p>
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
