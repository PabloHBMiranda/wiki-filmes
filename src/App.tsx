import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Filmes from "./pages/Filmes";
import './App.scss'

function App() {
  return (
      <BrowserRouter basename={"/"}>
          <Routes>
              <Route
                  path={`/`}
                  element={
                      <Home/>
                  }
              />
              <Route
                  path={`/filmes`}
                  element={
                      <Filmes/>
                  }
              />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
