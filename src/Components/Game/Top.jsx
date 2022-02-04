import React from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useGame } from 'Context/GameContext'
import Box from '@mui/material/Box';
import UndoIcon from '@mui/icons-material/UndoRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';


export default function Top() {
    const { submit, undo } = useGame();
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            mt: 1,
        }}>
            <ButtonGroup variant='contained'>
                <Button variant='contained' onClick={() => undo()}><UndoIcon /></Button>
                <Button variant='contained' onClick={() => submit()}><SendRoundedIcon /></Button>
            </ButtonGroup>
        </Box>
    )
}
