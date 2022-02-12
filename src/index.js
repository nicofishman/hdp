import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppProvider from './App';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from 'rdndmb-html5-to-touch';
import { GameProvider } from './Context/GameContext';
import { DropProvider } from './Context/DropContext';
import { DragProvider } from './Context/DragContext';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from 'Context/LanguageContext';
import { FirebaseProvider } from 'Context/FirebaseContext';

ReactDOM.render(
    <BrowserRouter>
        <LanguageProvider>
            <FirebaseProvider>
                <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                    <GameProvider> <DropProvider> <DragProvider>
                        <AppProvider />
                    </DragProvider> </DropProvider> </GameProvider>
                </DndProvider >
            </FirebaseProvider>
        </LanguageProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
