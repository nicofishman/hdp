import React from 'react'
import '../App.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useGame } from '../Context/GameContext'
import Box from '@mui/material/Box';


function Top() {
    const { newRound, undo } = useGame();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            mt: 1,
        }}>
            <ButtonGroup variant='contained'>
                <Button variant='contained' onClick={() => newRound()}>Confirmar</Button>
                <Button variant='contained' onClick={() => undo()}>Deshacer</Button>
            </ButtonGroup>
        </Box>
    )
}

export default Top
