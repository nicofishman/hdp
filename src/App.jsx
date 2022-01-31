import React from "react";
import "./App.css";
import BottomCards from "./Components/BottomCards";
import { CustomDragLayer } from "./Components/CustomDragLayer";
import TopCards from "./Components/TopCards";
import Top from "./Components/Top";
import Box from '@mui/material/Box';
//TODO: TERMINAR DE CORREGIR cartas.json. VOY POR EL ID 578
//* VER USECONTEXT / REDUX

export default function App() {
    return (
        <>
            <Box
                sx={{
                    margin: "2% auto",
                }}
            >
                <Top></Top>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexWrpa: "wrap",
                        justifyContent: "center",
                        textAlign: "center",
                    }}
                >
                    <TopCards />
                    <BottomCards />
                    <CustomDragLayer />
                </Box>
            </Box>
        </>
    );
}
