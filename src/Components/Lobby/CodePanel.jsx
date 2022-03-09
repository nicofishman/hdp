import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useThemeContext } from 'Context/ThemeContext';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Text } from 'Languages/Text';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';
import { useLanguageContext } from 'Context/LanguageContext';

function CodePanel({ code, showCode, setShowCode }) {
    const { theme } = useThemeContext();
    const [openTooltip, setOpenTooltip] = useState(false);
    const languageContext = useLanguageContext();
    const tooltipText = languageContext.dictionary.codecopied || 'Code copied';

    const copy = () => {
        navigator.clipboard.writeText(code);
        console.log('Copied to clipboard');
        setOpenTooltip(true);
        setTimeout(() => {
            setOpenTooltip(false);
        }, 1500);
    };

    return (
        <Box
            sx={{
                alignItems: 'center',
                bgcolor: theme.palette.background.default,
                border: '1px solid #666',
                borderRadius: 3,
                bottom: 10,
                boxShadow: `0.2em 0.2em 0.5em ${theme.palette.mode === 'light' ? '#333' : '#666'}`,
                display: 'flex',
                flexDirection: 'column',
                height: 90,
                justifyContent: 'center',
                maxWidth: '51vw',
                mb: 0.5,
                mr: 0.5,
                padding: 1,
                position: 'absolute',
                textAlign: 'center',
                whiteSpace: { lg: 'nowrap', xs: 'normal' },
                width: 300,
            }}>
            <Typography sx={{ fontSize: 25 }}><Text tid='code'></Text></Typography>
            <Box sx={{ display: 'flex' }}>
                {!showCode ?
                    <>
                        <Typography sx={{ fontSize: 20 }}>{'●'.repeat(code.length)}</Typography>
                        <Visibility onClick={() => setShowCode(!showCode)} sx={{ ml: 1, mt: 0.7, '&:hover': { cursor: 'pointer' } }} />
                        <Tooltip
                            PopperProps={{
                                disablePortal: true,
                            }}
                            onOpen={() => setOpenTooltip(true)}
                            onClose={() => setOpenTooltip(false)}
                            open={openTooltip}
                            disableHoverListener
                            title={tooltipText}
                            sx={{
                                fontWeight: 'light',
                            }}
                        >
                            <ContentCopyIcon onClick={() => copy()} sx={{ ml: 1, mt: 0.5, '&:hover': { cursor: 'pointer' } }} />
                        </Tooltip>
                    </> :
                    <>
                        <Typography sx={{ fontSize: 24 }}>{code}</Typography>
                        <VisibilityOff onClick={() => setShowCode(!showCode)} sx={{ ml: 1, mt: 0.9, '&:hover': { cursor: 'pointer' } }} />
                        <ContentCopyIcon onClick={() => copy()} sx={{ ml: 1, mt: 0.9, '&:hover': { cursor: 'pointer' } }} />
                    </>
                }
            </Box>
        </Box >
    );
}

export default CodePanel;
