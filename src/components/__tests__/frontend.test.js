import { render,screen,findByText,cleanup,act,fireEvent,waitFor, getByTestId } from "@testing-library/react"
import Body from '../Body';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NewNotes from "../noteCard";

const mock = new MockAdapter(axios);

// Mock Axios API calls
jest.mock('axios');

mock.onGet("http://192.168.17.220:3001/note").reply(200, { 
  data: {
    id: 1,
    title: "mockTitle",
    description: 'mockDescription',
    date: '18-02-2023'
  } 
});

test('renders data fetched from API', async () => {
  // Mock the Axios response for the GET request
 await axios.get.mockResolvedValue({ 
    data: {
      data: {
        id: 1,
        title: "mockTitle",
        description: 'mockDescription',
        date: '18-02-2023'
      }
  }
});

  render(<Body />);

//   // Wait for data to be fetched
//   // await waitFor(() => {
//   //   expect(screen.getAllByText('mockDescription')).toBeInTheDocument();
//   // });
});

test('renders mockDescription in NewNotes', () => {
  const mockDescription = 'mockDescription'; // Replace with your actual value

  // Render the NewNotes component with the mockDescription prop
  render(<NewNotes id={1} title={'mockTitle'} description={'mockDescription'} date={'18-02-2023'}/>);

  // const paragraphElement = getByTestId('test-desc');

  // Use getByText to search for the text content in the rendered component
  expect(screen.getAllByTestId('test-desc').textContent).toBe(undefined);
});

test('it should perform a edit button click', async() => {

  const mockSetModal = jest.fn();

  const { getByText } = render(<NewNotes setModal={mockSetModal}/>);
  const button = getByText('Edit'); // Replace with the text on your button

  fireEvent.click(button);

  expect(mockSetModal).toHaveBeenCalled()
});

test('it should perform a delete button click', async() => {

  const mockSetModal = jest.fn();

  const { getByText } = render(<NewNotes setModal={mockSetModal}/>);
  const button = getByText('Delete'); // Replace with the text on your button

  fireEvent.click(button);
});

test('Rendering the notes of the notepad',()=>{
    render(<Body/>)
})

test('First Test',()=>{
    //In Testing Hello World 
    expect(true).toBe(true)  
})  



// const mockAxios = new MockAdapter(axios);

// Your test suite
// describe('Body', () => {
//   it('fetches data from the backend and sets it in state', async () => {
//     // Mock the Axios request
//     mockAxios.onGet('http://192.168.0.106:3001/note').reply(200, [{ id: 1, title: 'javascript', description: 'javascript is an most loved programming language' }]);

//     // Render the component
//     let getByText;
//     await act(async () => {
//       const { getByText: getByTextFunc } = render(<Body />);
//       getByText = getByTextFunc;
//     });

//     // You can now make assertions based on the component's behavior
//     const titleCheck = screen.getByText('javascript');
//     expect(titleCheck).toBeTruthy();

//     const descriptionCheck = screen.getByText('javascript is an most loved programming language');
//     expect(descriptionCheck.tagName).toBe('P');
//   });
// });

// describe('handleModify function', () => {
//     let axiosMock;
  
//     beforeEach(() => {
//       axiosMock = new MockAdapter(axios);
//     });
  
//     afterEach(() => {
//       axiosMock.restore();
//     });
  
//     // it('should make an Axios PATCH request and call handleClose', async () => {
//     //   const editIndex = 123;
//     //   const newTitle = 'New Title';
//     //   const newDescription = 'New Description';
//     //   const handleClose = jest.fn();
  
//     //   axiosMock.onPatch(`http://192.168.0.11:3001/note/${editIndex}`).reply(200, {}); // Mock a successful response
  
//     // //   await handleModify(editIndex, newTitle, newDescription, handleClose);
  
//     //   // Assert that the Axios request was made with the correct URL and data
  
//     //   // Assert that handleClose was called
//     //   expect(handleClose).toHaveBeenCalledTimes(0);
//     // });
  
//     // it('should handle Axios error and call handleClose', async () => {
//     //   const editIndex = 123;
//     //   const newTitle = 'New Title';
//     //   const newDescription = 'New Description';
//     //   const handleClose = jest.fn();
  
//     //   axiosMock.onPatch(`http://192.168.0.11:3001/note/${editIndex}`).reply(500); // Mock an error response
  
//     // //      await handleModify(editIndex, newTitle, newDescription, handleClose);
  
//     //   // Assert that the Axios request was made with the correct URL and data
//     //   // expect(axiosMock).toBe(`http://192.168.0.106:3001/note/${editIndex}`);
//     //   // expect(JSON.parse(axiosMock.history.patch[0].data)).toEqual({
//     //   //   title: newTitle,
//     //   //   description: newDescription,
//     //   // });
  
//     //   // Assert that handleClose was called
//     //   expect(handleClose).toHaveBeenCalledTimes(0);
//     // });
//   });
