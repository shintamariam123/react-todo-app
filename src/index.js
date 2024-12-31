import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the correct module for React 18+
import App from './components/wrappers/App';

// Add bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Add our style
import './assets/style/index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root using React 18+ API
root.render(
    <App />
);
