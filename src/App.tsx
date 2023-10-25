// Libraries
import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Filmes from "./pages/Filmes";
import Contato from "./pages/Contato";

// Styles
import './App.scss'

function App() {
    return (
        <BrowserRouter basename='/'>
            <Routes>
                <Route
                    path='/'
                    element={<Home/>}
                />
                <Route
                    path='/filmes'
                    element={<Filmes/>}
                />
                <Route
                    path='/contato'
                    element={<Contato/>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
