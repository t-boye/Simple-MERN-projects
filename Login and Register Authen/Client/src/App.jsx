import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // corrected import
import Login from './Pages/Login';
import Register from './Pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
