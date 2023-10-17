import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import './App.css';
import AppRoutes from './routes/routes';



Amplify.configure(awsExports);

function App() {
  return (
    <Router>
      <div>

        <NavigationBar />

        <AppRoutes />

      </div>
    </Router>
  );
}

export default App;
