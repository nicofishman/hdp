import React from 'react';
import MenuSignUp from 'Components/Menu/MenuSignUp';
import { useFirebaseAuthContext } from 'Context/Firebase.authContext';
import MenuAccountOn from 'Components/Menu/MenuAccountOn';
import Box from '@mui/material/Box';

function MenuAccount() {
    const { userAuth } = useFirebaseAuthContext();
    return (
        <Box
            sx={{
                position: 'relative',
                margin: '2% auto',
                // height: '100%',
                width: '100%',
            }}
        >
            {!(userAuth.uid) ? <MenuSignUp /> : <MenuAccountOn />}
        </Box>
    );
}

export default MenuAccount;
