import React from 'react';
import Typography from '@mui/material/Typography';
import { Text } from 'Languages/Text';
import SettingsSection from 'Components/Menu/SettingsSection';

function MenuButton({ text, sx = {}, onClick = null }) {
    return (
        <SettingsSection
            onClick={onClick}
            sx={{
                "&:hover": {
                    cursor: 'pointer',
                },
                ...sx
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
                    transition: 'letter-spacing 0.2s ease',
                    "&:hover": {
                        letterSpacing: '0.05em',
                    }
                }}
            >
                <Text tid={text} />
            </Typography>
        </SettingsSection >
    )
}

export default MenuButton;
