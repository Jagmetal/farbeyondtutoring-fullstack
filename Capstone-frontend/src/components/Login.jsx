import React, { useState, useEffect } from 'react';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
//import '../styles/Login.css';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const data = await Auth.currentAuthenticatedUser();
            setUser(data);

            const intendedPath = location.state?.from || '/';
            navigate(intendedPath);
        } catch (err) {
            console.error('Not authenticated', err);
        }
    };

    const signOutHandler = async () => {
        try {
            await Auth.signOut();
            setUser(null);
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const formFields = {
        signIn: {
            username: {
                label: 'Email',
                required: true,
                placeholder: 'Enter your Email',
                order: 1,
            },
            password: {
                label: 'Password',
                required: true,
                placeholder: 'Enter your Password',
                order: 2,
            },
        },
        signUp: {
            name: {
                label: 'Name',
                required: true,
                placeholder: 'Enter your Name',
                order: 0,
            },
            email: {
                order: 1,
            },
            password: {
                order: 2,
            },
            confirm_password: {
                order: 3,
            },
        },
    };

    return (
        <Container className="mt-5">
            {user ? (
                <div>
                    <h4>Welcome, {user.username}!</h4>
                    <button onClick={signOutHandler}>Sign out</button>
                </div>
            ) : (
                <Authenticator formFields={formFields} />
            )}
        </Container>
    );
};

// Wrap the Login component with the withAuthenticator HOC
export default withAuthenticator(Login, { includeGreetings: false });
