import React from 'react';
import MenuSignUp from 'Components/Menu/MenuSignUp';
import { useFirebaseContext } from 'Context/FirebaseContext';
import MenuAccountOn from 'Components/Menu/MenuAccountOn';
import Box from '@mui/material/Box';

function MenuAccount() {
    const { user } = useFirebaseContext();
    return (
        <Box
            sx={{
                position: 'relative',
                margin: '2% auto',
                // height: '100%',
                width: '100%',
            }}
        >
            {!(user.uid) ? <MenuSignUp /> : <MenuAccountOn />}
        </Box>
    );
}

export default MenuAccount;
