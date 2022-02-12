import React from 'react';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Text } from 'Languages/Text';

function MyAlert({ slideIn = null, setSlideIn = null, severity = null, text }) {
    return (
        <Slide
            in={slideIn}
            direction="right"
            timeout={500}
            easing={'ease-in-out'}
            mountOnEnter
            unmountOnExit
        >
            <Alert
                variant="filled"
                severity={severity}
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setSlideIn(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2, position: 'absolute', bottom: 0, left: 10 }}
            >
                <Typography sx={{ fontWeight: 'light' }} >
                    <Text tid={text} />
                </Typography>
            </Alert>
        </Slide>
    );
}

export default MyAlert;
