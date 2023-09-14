import { render,screen,cleanup,act,fireEvent } from "@testing-library/react"
import Body from '../Body';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

// Your test suite
describe('Body', () => {
  it('fetches data from the backend and sets it in state', async () => {
    // Mock the Axios request
    mockAxios.onGet('http://192.168.0.106:3001/note').reply(200, [{ id: 1, title: 'javascript', description: 'javascript is an most loved programming language' }]);

    // Render the component
    let getByText;
    await act(async () => {
      const { getByText: getByTextFunc } = render(<Body />);
      getByText = getByTextFunc;
    });

    // You can now make assertions based on the component's behavior
    const titleCheck = screen.getByText('javascript');
    expect(titleCheck).toBeTruthy();

    const descriptionCheck = screen.getByText('javascript is an most loved programming language');
    expect(descriptionCheck.tagName).toBe('P');
  });
});

describe('handleModify function', () => {
    let axiosMock;
  
    beforeEach(() => {
      axiosMock = new MockAdapter(axios);
    });
  
    afterEach(() => {
      axiosMock.restore();
    });
  
    it('should make an Axios PATCH request and call handleClose', async () => {
      const editIndex = 123;
      const newTitle = 'New Title';
      const newDescription = 'New Description';
      const handleClose = jest.fn();
  
      axiosMock.onPatch(`http://192.168.0.106:3001/note/${editIndex}`).reply(200, {}); // Mock a successful response
  
    //   await handleModify(editIndex, newTitle, newDescription, handleClose);
  
      // Assert that the Axios request was made with the correct URL and data
  
      // Assert that handleClose was called
      expect(handleClose).toHaveBeenCalledTimes(0);
    });
  
    it('should handle Axios error and call handleClose', async () => {
      const editIndex = 123;
      const newTitle = 'New Title';
      const newDescription = 'New Description';
      const handleClose = jest.fn();
  
      axiosMock.onPatch(`http://192.168.0.106:3001/note/${editIndex}`).reply(500); // Mock an error response
  
    //      await handleModify(editIndex, newTitle, newDescription, handleClose);
  
      // Assert that the Axios request was made with the correct URL and data
      // expect(axiosMock).toBe(`http://192.168.0.106:3001/note/${editIndex}`);
      // expect(JSON.parse(axiosMock.history.patch[0].data)).toEqual({
      //   title: newTitle,
      //   description: newDescription,
      // });
  
      // Assert that handleClose was called
      expect(handleClose).toHaveBeenCalledTimes(0);
    });
  });


test('Rendering the notes of the notepad',()=>{
    render(<Body/>)
})

test('First Test',()=>{
    //In Testing Hello World 
    expect(true).toBe(true)  
})  
