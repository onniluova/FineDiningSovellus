/**
 * @jest-environment jsdom
 */

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ user: { user: { asiakas_id: 1 } } }),
  })
);

afterEach(() => {
  jest.clearAllMocks();
});

console.log = jest.fn();


import { registerUser } from '../JS/register';

describe('registerUser', () => {
  it('sends a registration request with the correct data', () => {
    // Set up our document body
    document.body.innerHTML =
      '<input id="email" value="test@example.com" />' +
      '<input id="password" value="password" />' +
      '<input id="first_name" value="John" />' +
      '<input id="last_name" value="Doe" />';

    const event = { preventDefault: jest.fn() };

    registerUser(event);

    expect(fetch).toHaveBeenCalledWith('http://10.120.32.92/app/register', {
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
