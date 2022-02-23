import Box from '@mui/material/Box';
import BottomCards from 'Components/Game/BottomCards';
import { CustomDragLayer } from 'Components/Game/CustomDragLayer';
import Top from 'Components/Game/Top';
import TopCards from 'Components/Game/TopCards';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GameService } from 'Backend/GameService';

function Game() {
    const { gameId } = useParams();
    GameService(gameId);
    return (
        <Box
            sx={{
                margin: '2% auto',
            }}
        >
            <Top></Top>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrpa: 'wrap',
                    justifyContent: 'center',
                    textAlign: 'center',
                }}
            >
                <TopCards />
                <BottomCards />
                <CustomDragLayer />
            </Box>
        </Box>
    );
}

export default Game;
