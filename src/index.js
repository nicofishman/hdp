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
import { FirebaseAuthProvider } from 'Context/Firebase.authContext';
import { FirebaseDatabaseProvider } from 'Context/Firebase.databaseContext';
import { AlertsProvider } from './Context/AlertsContext';

ReactDOM.render(
    <BrowserRouter>
        <AlertsProvider>
            <LanguageProvider>
                <FirebaseDatabaseProvider>
                    <FirebaseAuthProvider>
                        <GameProvider>
                            <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                                <DropProvider>
                                    <DragProvider>
                                        <AppProvider />
                                    </DragProvider>
                                </DropProvider>
                            </DndProvider >
                        </GameProvider>
                    </FirebaseAuthProvider>
                </FirebaseDatabaseProvider>
            </LanguageProvider>
        </AlertsProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
