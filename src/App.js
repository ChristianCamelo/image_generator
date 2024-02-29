
import Login_Page from './pages/login_page';
import Workspace_Page from './pages/workspace_page';
import Register_Page from './pages/register_page';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="home" element={<Login_Page/>}></Route>
        <Route path="register" element={<Register_Page/>}></Route>
        <Route path="workspace" element={<Workspace_Page/>}></Route>
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
