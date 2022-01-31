import React from 'react';
import logo from './Mono.png';
import { useDrag } from 'react-dnd';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const Card = (props) => {
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: props.color === 'White' ? 'white-card' : 'black-card',
        item: () => ({
            id: props.id,
            color: props.color,
            name: props.name,
            extension: props.extension
        }),
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        canDrag: props.draggable,
    }), [props.draggable]);


    useEffect(() => {
        dragPreview(getEmptyImage());
    });

    return (
        <Box
            sx={{
                position: 'relative',
                width: '10.3em',
                height: '15.6em',
                border: '1px solid #666',
                borderRadius: '0.3em',
                padding: 1,
                mr: 0.5,
                mb: 0.5,
                textAlign: 'center',
                overflowWrap: 'break-word',
                bgcolor: props.color === 'White' ? "white" : "black",
                color: props.color === 'White' ? "black" : "white",
                boxShadow: '0.2em 0.2em 0.5em #333',
                transitionDuration: '0.5s',
                userSelect: 'none',
                display: isDragging ? 'none' : 'inline-block',
                "&:hover": {
                    transform: props.color === 'White' && 'translateY(-0.8em)',
                    cursor: props.color === 'White' && 'pointer'
                },
            }}
            ref={drag}
        >
            <Typography align={'left'} sx={{ p: 0.8, userSelect: 'none', fontWeight: 'bold', lineHeight: 1.2 }}>
                {props.name}
            </Typography>
            <img src={logo} alt='logo' className='mono' />
        </Box>
    )
}
