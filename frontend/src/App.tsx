import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { NavBar } from './components';
import AppRouter from './routes/Routes';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
