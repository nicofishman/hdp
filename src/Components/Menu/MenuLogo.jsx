import Grid from '@mui/material/Grid';
import React from 'react';
import { ReactComponent as Logo } from 'Common/Logo.svg';

function MenuLogo() {
    return (
        <Grid
            container item
            columnSpacing={{ xs: 1, md: 2 }}
            rowSpacing={3}
            justifyContent={'center'}
            alignItems={'center'}
            mt={{ lg: 10, md: 7, xs: 5 }}
            display={'flex'}
            flexDirection={'column'}
        >
            <Grid item sx={{ width: '100%', maxWidth: '35em', userSelect: 'none' }}>
                <Logo />
            </Grid>
        </Grid >
    );
}

export default MenuLogo;
