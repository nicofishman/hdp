import React from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "Components/Routes/Menu";
import Game from "Components/Routes/Game";
import { ThemeProvider } from 'Context/ThemeContext';
//TODO: TERMINAR DE CORREGIR cartas.json. VOY POR EL ID 578
//* VER USECONTEXT / REDUX

export default function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path='/' element={<Menu page="index" />} />
                <Route path="/account" element={<Menu page="account" />} />
                <Route path="/settings" element={<Menu page="settings" />} />
                <Route path='/game/:gameId' element={<Game />} />
                <Route path='*' element={<h1>NOT FOUND</h1>} />
            </Routes>
        </ThemeProvider>
    );
}
