import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, ProfilePage } from '../pages';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
);

export default AppRouter;
