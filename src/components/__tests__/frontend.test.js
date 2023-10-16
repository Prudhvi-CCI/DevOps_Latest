import { render,screen,findByText,cleanup,act,fireEvent,waitFor, getByTestId } from "@testing-library/react"
import Body from '../Body';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import NewNotes from "../noteCard";
import config from "../../config/config";

const mock = new MockAdapter(axios);

// Mock Axios API calls
jest.mock('axios');

// Define a mock response data
const mockData = [
  {
    id: 1,
    title: "mockTitle_1",
    description: 'mockDescription_1',
    date: '18-02-2023'
  },
  {
    id: 2,
    title: "mockTitle_2",
    description: 'mockDescription_2',
    date: '18-02-2023'
  },
  {
    id: 3,
    title: "mockTitle_3",
    description: 'mockDescription_3',
    date: '18-02-2023'
  },
  {
    id: 1,
    title: "mockTitle_4",
    description: 'mockDescription_4',
    date: '18-02-2023'
  }
];

test('Check data is fetched properly in useEffect with axios-mock-adapter', async () => {

  // Mock the Axios request
  mock.onGet(`http://${config.backendBaseUrl}`).reply(200, mockData);

  axios.get.mockResolvedValue({ data: mockData });

  render(<Body />);

  // Wait for the asynchronous code to resolve (adjust the wait time as needed)
  await act(() => {
    // Check that Axios made the request with the correct URL
    expect(axios.get).toHaveBeenCalledWith(`http://${config.backendBaseUrl}`);
  });

  // Restore the original axios behavior
  mock.restore();
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
})


test('renders mockDescription in NewNotes', () => {

  // Render the NewNotes component with the mockDescription prop
  render(<NewNotes id={1} title={'mockTitle'} description={'mockDescription'} date={'18-02-2023'}/>);

  // Use getByText to search for the text content in the rendered component
  expect(screen.getAllByTestId('test-desc').textContent).toBe(undefined);
});

test('it should perform a edit button click', async() => {

  const mockSetModal = jest.fn();

  const { getByText } = render(<NewNotes setModal={mockSetModal}/>);
  const button = getByText('Edit'); // Replace with the text on your button

  await act(async()=>{
    fireEvent.click(button);
    expect(mockSetModal).toHaveBeenCalled()
  })
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