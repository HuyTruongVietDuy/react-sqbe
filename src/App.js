import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './Admin/index';
import User from './User/index';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
