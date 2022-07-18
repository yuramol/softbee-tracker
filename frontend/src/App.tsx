import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './routes/Routes';
import { DayViewTracker } from './components';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <DayViewTracker />
    </BrowserRouter>
  );
}

export default App;
