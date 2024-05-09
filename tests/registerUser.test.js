document.getElementById = jest.fn(id => {
  switch (id) {
    case 'email':
      return { value: 'test@example.com' };
    case 'password':
      return { value: 'password' };
    case 'first_name':
      return { value: 'John' };
    case 'last_name':
      return { value: 'Doe' };
    default:
      return null;
  }
});

// Mock the console.log function to keep the test output clean
console.log = jest.fn();

// Import the registerUser function
import { registerUser } from '../JS/register';

describe('registerUser', () => {
  it('sends a registration request with the correct data', () => {
    // Create a mock event
    const event = { preventDefault: jest.fn() };

    // Call the function with the mock event
    registerUser(event);

    // Check that fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@example.com',
        password: 'password',
        role: 'user',
      }),
    });
  });
});
