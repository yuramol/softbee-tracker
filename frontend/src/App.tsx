import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Typography variant="h2" color="primary">
        wewewe
      </Typography>
      <Typography variant="h2" color="textDark">
        wewewe
      </Typography>
      <Typography variant="h2" color="secondary">
        wewewe
      </Typography>
      <p>wwwweeeee</p>
    </div>
  );
}

export default App;
