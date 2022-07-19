import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, LoginPage, ProfilePage, ProjectPage } from '../pages';

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/project" element={<ProjectPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/profile" element={<ProfilePage />} />
  </Routes>
);
