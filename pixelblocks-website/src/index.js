import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NotFound from "./Pages/NotFound";
import Pixelblocks from "./Pages/Pixelblocks";
import Homepage from "./Pages/Homepage";

import './Pages/CSS/Index.css'
import './Pages/CSS/Reset.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pixelblocks" element={<Pixelblocks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);