import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Text } from 'Languages/Text';

function MenuButton({ text }) {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 90,
                width: 275,
                minWidth: '51%',
                border: '1px solid #666',
                borderRadius: 3,
                padding: 1,
                mr: 0.5,
                mb: 0.5,
                textAlign: 'center',
                whiteSpace: { lg: 'nowrap', xs: 'normal' },
                bgcolor: "white",
                color: "black",
                boxShadow: '0.2em 0.2em 0.5em #333',
                userSelect: 'none',
            }}>
            <Typography
                align={'center'}
                sx={{
                    p: 0.8,
                    userSelect: 'none',
                    fontWeight: 'bold',
                    lineHeight: 1.2,
                    textTransform: 'uppercase',
                    fontSize: 40,
                }}
            >
                <Text tid={text} />
            </Typography>

        </Box >
    )
}

export default MenuButton;
