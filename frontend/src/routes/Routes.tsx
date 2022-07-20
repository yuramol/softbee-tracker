import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeLayout, PublicLayout } from '../components/Layout';
import { HomePage, LoginPage, ProfilePage, ProjectPage } from '../pages';

export const AppRouter = () => (
  <Routes>
    <Route element={<PublicLayout />}>
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<LoginPage />} />
    </Route>

    <Route element={<EmployeeLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/project" element={<ProjectPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
  </Routes>
);
