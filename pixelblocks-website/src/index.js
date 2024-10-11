import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


import NotFound from "./Pages/NotFound";
import Pixelblocks from "./Pages/Pixelblocks";
import Homepage from "./Pages/Homepage";

import Header from "./Pages/Components/Header";

import "./Pages/CSS/Index.css";
import "./Pages/CSS/Reset.css";

const firebaseConfig = {
  apiKey: "AIzaSyBGDqWTiw63RxFMhEqh_V-T9jy6sP8I9Vw",
  authDomain: "pixelblocks-f6da1.firebaseapp.com",
  projectId: "pixelblocks-f6da1",
  storageBucket: "pixelblocks-f6da1.appspot.com",
  messagingSenderId: "1073996073097",
  appId: "1:1073996073097:web:eaecb7e2be5591d21c1e58",
  measurementId: "G-8RQM98XEPE",
databaseUrl: "https://pixelblocks-f6da1-default-rtdb.firebaseio.com/",
};

const firebase = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => { 
  return (
      <BrowserRouter>

        <Header />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/play" element={<Pixelblocks />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
);}

export const database = getDatabase(firebase);
export const auth = getAuth(firebase);
root.render(<React.StrictMode><App /></React.StrictMode>);
