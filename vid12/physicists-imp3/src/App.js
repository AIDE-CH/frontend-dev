import './App.css';
import { useState } from 'react';
import { Physicist } from './js-common/physicist';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import PhysicistEdit from './Components/PhysicistEdit';


function App() {


  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/physicist/:id" element={<PhysicistEdit/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
