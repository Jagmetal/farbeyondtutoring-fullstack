import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import Login from '../src/components/Login';

const TEST_EMAIL = 'jagsingh@hotmail.co.nz';

jest.mock('aws-amplify', () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn(),
    signOut: jest.fn(),
  },
  Logger: class {}
}));

jest.mock('@aws-amplify/ui-react', () => ({
  Authenticator: () => <div>{TEST_EMAIL}</div>,
  withAuthenticator: (component) => component
}));

describe('<Login />', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Authenticator when the user is not authenticated', async () => {
    Auth.currentAuthenticatedUser.mockRejectedValue(new Error('Not authenticated'));
    render(
      <Router>
        <Login />
      </Router>
    );  
    await waitFor(() => expect(screen.queryByText(TEST_EMAIL)).toBeInTheDocument());
  });

  it('should greet the user when authenticated', async () => {
    const mockUser = {
      username: 'testuser',
    };
    Auth.currentAuthenticatedUser.mockResolvedValue(mockUser);
    render(
      <Router>
        <Login />
      </Router>
    );
    await waitFor(() => expect(screen.queryByText(`Welcome, ${mockUser.username}!`)).toBeInTheDocument());
  });

  it('should sign out the user when "Sign out" button is clicked', async () => {
    const mockUser = {
      username: 'testuser',
    };
    Auth.currentAuthenticatedUser.mockResolvedValue(mockUser);
    render(
      <Router>
        <Login />
      </Router>
    );
    const signOutButton = await waitFor(() => screen.getByText('Sign out'));
    fireEvent.click(signOutButton);
    expect(Auth.signOut).toHaveBeenCalled();
  });


});
