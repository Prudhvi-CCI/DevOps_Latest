import React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import config from '../../config/config';
import Notes from '../notes';

const mock = new MockAdapter(axios);

// Mock Axios API calls
jest.mock('axios');

test('Check if input updates the title state', () => {
  const setRenderBody = jest.fn();

  const { getByPlaceholderText } = render(<Notes currentBody={false} updateBody={setRenderBody}/>);

  const inputElement = getByPlaceholderText('Enter title..');

  // Type a value into the input
  fireEvent.change(inputElement, { target: { value: 'LiteCon' } });

  // Check if the input's value attribute is updated
  expect(inputElement.value).toBe('LiteCon');
});

test('Check if input updates the description state', () => {
    const setRenderBody = jest.fn();
  
    const { getByPlaceholderText } = render(<Notes currentBody={false} updateBody={setRenderBody}/>);
  
    const inputElement = getByPlaceholderText('Enter description..');
  
    // Type a value into the input
    fireEvent.change(inputElement, { target: { value: 'LiteCon brand builts many good portal fans' } });
  
    // Check if the input's value attribute is updated
    expect(inputElement.value).toBe('LiteCon brand builts many good portal fans');
});

test('Check if input updates the password state', () => {
    const setRenderBody = jest.fn();
  
    const { getByPlaceholderText } = render(<Notes currentBody={false} updateBody={setRenderBody}/>);
  
    const inputElement = getByPlaceholderText('Enter password..');
  
    // Type a value into the input
    fireEvent.change(inputElement, { target: { value: '7089' } });
  
    // Check if the input's value attribute is updated
    expect(inputElement.value).toBe('7089');
});


test('Check handleAddNote function', async () => {

  const setRenderBody = jest.fn();

  // Define a mock response data (optional for POST request testing)
  const mockResponseData = { success: true };

  // Mock the axios.post method to return the mock response data
  mock.onPost(`http://${config.backendBaseUrl}`).reply(200, mockResponseData);

  const { getByText, getByTestId } = render(<Notes currentBody={false} updateBody={setRenderBody}/>);

  // Simulate input changes if necessary
  fireEvent.change(getByTestId('title-input'), { target: { value: 'Test Title' } });
  fireEvent.change(getByTestId('description-input'), { target: { value: 'Test Description' } });
  fireEvent.change(getByTestId('password-input'), { target: { value: 'Test Password' } });

  // Simulate a click on the "Add Note" button
  fireEvent.click(getByText('Add Note'));

  const currentDate = new Date();

  // Wait for the asynchronous code to resolve
  await waitFor(() => {
    // Check if Axios made the POST request with the correct URL and data
    expect(axios.post).toHaveBeenCalledWith(`http://${config.backendBaseUrl}`, {
      title: 'Test Title',
      description: 'Test Description',
      password: 'Test Password',
      date: currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString()
    });

    // Check if the input fields are cleared
    expect(getByTestId('title-input').value).toBe('');
    expect(getByTestId('description-input').value).toBe('');
    expect(getByTestId('password-input').value).toBe('');
  });

  // Restore the original axios behavior
  mock.restore();
});

